import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../entity/admin/role.entity';
import { RoleInterface } from '../../interface/role.interface';
import { Tools } from '../../utils/tools';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    @Inject('RoleService')
    private roleRepository: Repository<Role>,
    private tools: Tools,
  ) {}

  /**
   * 获取角色
   * @param json
   * @param pageParam
   */
  async find(json: any, pageParam: any) {
    try {
      let sqlTotal = 'SELECT count(*) as total FROM `role` ';
      const total = await this.roleRepository.query(sqlTotal);
      let sql = `SELECT * FROM role order by add_time DESC LIMIT ${pageParam.pageSize *
        (pageParam.pages - 1)},${pageParam.pageSize}`;
      const data = await this.roleRepository.query(sql);
      return {
        pageData: data,
        pageSize: pageParam.pageSize,
        pages: Math.ceil(+total[0].total / pageParam.pageSize),
        totalSize: +total[0].total,
      };
    } catch (error) {
      return error;
    }
  }

  /**
   * 新增角色
   * @param json
   */
  async add(params: any = {}) {
    try {
      const data = await this.roleRepository.query(
        'INSERT INTO role SET ?',
        params,
      );
      return data;
    } catch (error) {
      return error;
    }
  }

  /**
   * 编辑保存角色信息
   * @param params
   */
  async update(params: any) {
    try {
      const sql = [
        `role`,
        `SET status='${params.status}',`,
        `title='${params.title}',`,
        `description='${params.description}',`,
        `update_time='${this.tools.formatDate(
          new Date(),
          'yyyy-MM-dd hh:mm:ss',
        )}'`,
        `WHERE _id=${params._id}`,
      ].join(' ');
      return await this.roleRepository.query(`update ${sql}`);
    } catch (error) {
      return error;
    }
  }

  /**
   * 删除角色
   * @param params
   */
  async delete(id: string) {
    try {
      const sql = ['role', `FROM role`, `WHERE _id=${id}`].join(' ');
      return await this.roleRepository.query(`delete ${sql}`);
    } catch (error) {
      return error;
    }
  }
}
