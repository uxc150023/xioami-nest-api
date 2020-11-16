import { HttpStatus, Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

// 引入验证码库
import * as svgCaptcha from 'svg-captcha';
import * as md5 from 'md5';

@Injectable()
export class ToolsService {
  public client;
  constructor(private redisService: RedisService) {
    this.getClient();
  }
  async getCaptcha() {
    let captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 50,
      background: 'transparent',
    });
    return captcha;
  }

  getMd5(str: string) {
    return md5(str);
  }

  // -------------------------------封装redies---------------------------
  async getClient() {
    this.client = await this.redisService.getClient();
  }
  /**
   * 设置redis值
   * @param key
   * @param value
   * @param seconds
   */
  public async setRedis(key: string, value: any, seconds?: number) {
    value = JSON.stringify(value);
    if (!this.client) {
      await this.getClient();
    }
    if (!seconds) {
      await this.client.set(key, value);
    } else {
      await this.client.set(key, value, 'EX', seconds);
    }
  }
  /**
   * 获取redis值
   * @param key
   */
  public async getRedis(key: string) {
    if (!this.client) {
      await this.getClient();
    }
    var data = await this.client.get(key);
    if (!data) return;
    return JSON.parse(data);
  }

  /**
   * @Description: 根据key删除redis缓存数据
   * @param key {String}
   * @return:
   */
  public async delRedis(key: string): Promise<any> {
    if (!this.client) {
      await this.getClient();
    }
    await this.client.del(key);
  }

  /**
   * @Description: 清空redis的缓存
   * @param {type}
   * @return:
   */
  public async flushall(): Promise<any> {
    if (!this.client) {
      await this.getClient();
    }
    await this.client.flushall();
  }

  // -------------------------------封装redies---------------------------end

  // -------------------------------封装req------------------------------begin
  /**
   * 封装接口响应 success
   * @param data
   * @param message
   * @param res
   */
  async success(data: any, message: string, res: any) {
    return res
      .status(HttpStatus.OK)
      .json({ data: data, status: 0, subMessage: message });
  }
  /**
   * 封装接口响应 error
   * @param data 不为null 则跳转到登录页面2
   * @param message
   * @param res
   */
  async error(data: any, message: string, res: any) {
    return res
      .status(HttpStatus.OK)
      .json({ data: data, status: data ? 2 : 1, subMessage: message });
  }
  // -------------------------------封装req------------------------------end
}
