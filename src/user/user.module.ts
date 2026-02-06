import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserAccount } from './entity/user-account.entity';
import { UserBlock } from './entity/user-block.entity';
import { UserAgreement } from './entity/user-agreement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserAccount, UserBlock, UserAgreement]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
