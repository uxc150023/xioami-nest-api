import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../../entity/admin/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    @Inject('AdminService')
    private adminRepository: Repository<Admin>,
  ) {}

  // findAll(): Promise<Admin[]> {
  //   return this.adminRepository.find();
  // }
  async findAll() {
    return await this.adminRepository.find();
  }
}
