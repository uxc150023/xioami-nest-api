import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../entity/admin/role.entity';
import { RoleInterface } from '../../interface/role.interface';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    @Inject('RoleService')
    private roleRepository: Repository<Role>,
  ) {}

  /**
   * 获取角色
   * @param json
   * @param pageParam
   */
  async find(json: any, pageParam: any) {
    try {
      const total = await this.roleRepository.query(
        'SELECT count(*) as total  FROM `role` LIMIT 0,10',
      );
      const data = await this.roleRepository.query(
        'SELECT count(*) as total  FROM `role` LIMIT 0,10',
      );
      // let qb = this.roleRepository.createQueryBuilder(); // 创建queryBuilder
      // qb = qb
      //   .skip(pageParam.pageSize * (pageParam.pages - 1))
      //   .where(json as Partial<Role>)
      //   .take(pageParam.pageSize);
      // let res = await qb.getManyAndCount();
      // return {
      //   pageData: res[0],
      //   pageSize: pageParam.pageSize,
      //   pages: Math.ceil(res[1] / pageParam.pageSize),
      //   totalSize: Math.ceil(res[1]),
      // };
    } catch (error) {
      console.log('error:', error);
      return error;
    }
  }

  async add(json: any) {
    try {
      return await this.roleRepository.save(json);
    } catch (error) {
      return [];
    }
  }

  async update(json1: any, json2: any) {
    try {
      return await this.roleRepository.update(json1, json2);
    } catch (error) {
      return [];
    }
  }

  async delete(json: any) {
    try {
      return await this.roleRepository.delete(json);
    } catch (error) {
      return [];
    }
  }
}
