import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserAccount } from './entity/user-account.entity';
import { UserBlock } from './entity/user-block.entity';
import { UserAgreement } from './entity/user-agreement.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserAccount)
    private userAccountRepository: Repository<UserAccount>,
    @InjectRepository(UserBlock)
    private userBlockRepository: Repository<UserBlock>,
    @InjectRepository(UserAgreement)
    private userAgreementRepository: Repository<UserAgreement>,
  ) {}

  async getUsers(page: number = 1) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const [users, total] = await this.userRepository.findAndCount({
      select: {
        id: true,
        email: true,
        nickname: true,
        introduce: true,
        imageUri: true,
        trustGrade: true,
        createdAt: true,
      },
      skip: offset,
      take: perPage,
      order: { createdAt: 'ASC' },
      // relations: ['userAccount', 'blockerUsers', 'blockedUsers'],
    });

    return {
      data: users,
      total,
    };
  }

  async getUsersById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        email: true,
        nickname: true,
        introduce: true,
        imageUri: true,
        trustGrade: true,
        createdAt: true,
      },
      // relations: ['userAccount', 'blockerUsers', 'blockedUsers'],
    });
  }

  async getUserAccounts(page: number = 1) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const [accounts, total] = await this.userAccountRepository.findAndCount({
      select: {
        id: true,
        userId: true,
        bankName: true,
        accountNumber: true,
        createdAt: true,
        user: {
          id: true,
          email: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
        },
      },
      skip: offset,
      take: perPage,
      order: { createdAt: 'ASC' },
      relations: ['user'],
    });

    return {
      data: accounts,
      total,
    };
  }

  async getUserAccountById(id: number) {
    return this.userAccountRepository.findOne({
      where: { id },
      select: {
        id: true,
        userId: true,
        bankName: true,
        accountNumber: true,
        user: {
          id: true,
          email: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
        },
      },
      relations: ['user'],
    });
  }

  async getUserBlock(page: number = 1) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const [block, total] = await this.userBlockRepository.findAndCount({
      select: {
        id: true,
        blockerId: true,
        blockedId: true,
        createdAt: true,
        blocker: {
          id: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
        },
        blocked: {
          id: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
        },
      },
      skip: offset,
      take: perPage,
      order: { createdAt: 'ASC' },
      relations: ['blocker', 'blocked'],
    });

    return {
      data: block,
      total,
    };
  }
  ß;

  async getUserBlockById(id: number) {
    return this.userBlockRepository.findOne({
      where: { id },
      select: {
        id: true,
        blockerId: true,
        blockedId: true,
        createdAt: true,
        blocker: {
          id: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
        },
        blocked: {
          id: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
        },
      },
      relations: ['blocker', 'blocked'],
    });
  }

  async getUserAgreements(page: number = 1) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const [agreements, total] = await this.userAgreementRepository.findAndCount(
      {
        select: {
          id: true,
          userId: true,
          type: true,
          agreedAt: true,
          user: {
            id: true,
            email: true,
            nickname: true,
            introduce: true,
            imageUri: true,
            trustGrade: true,
          },
        },
        skip: offset,
        take: perPage,
        order: { agreedAt: 'ASC' },
        relations: ['user'],
      },
    );
    return {
      data: agreements,
      total,
    };
  }

  async getUserAgreementsById(id: number) {
    return this.userAgreementRepository.findOne({
      where: { id },
      select: {
        id: true,
        userId: true,
        type: true,
        agreedAt: true,
        user: {
          id: true,
          email: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
        },
      },
      relations: ['user'],
    });
  }
}
