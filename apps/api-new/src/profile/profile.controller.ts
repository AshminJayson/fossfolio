import { Body, Controller, Get, Param, Patch, Session, UseGuards } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileService } from './profile.service';
import { ReadException } from './exception/read.exception';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateException } from './exception/update.exception';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get()
    @UseGuards(new AuthGuard())
    async read(@Session() session: SessionContainer) {
        let authId: string;
        try {
            authId = session.getUserId();
            return await this.profileService.read(authId);
        } catch (err) {
            throw new ReadException(err);
        }
    }

    @Patch()
    @UseGuards(new AuthGuard())
    async update(@Session() session: SessionContainer, @Body() updateProfileDto: UpdateProfileDto) {
        let authId: string;
        try {
            authId = session.getUserId();
            return await this.profileService.update(updateProfileDto, authId);
        } catch (err) {
            throw new UpdateException(err);
        }
    }

    @Get(':githubid')
    @UseGuards(new AuthGuard())
    async readByGithubId(@Param('githubid') githubid: string) {
        try {
            return await this.profileService.readByGithubId(githubid);
        } catch (err) {
            throw new ReadException(err);
        }
    }
}
