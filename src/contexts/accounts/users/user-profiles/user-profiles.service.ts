import { Injectable } from '@nestjs/common';

@Injectable()
export class UserProfilesService {
  findAll() {
    return `This action returns all userProfiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userProfile`;
  }
}
