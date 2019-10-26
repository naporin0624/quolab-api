import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { SlackConfigService } from './slack-config.service';
import { AuthGuard } from '@nestjs/passport';
import { SlackConfigDto } from '@/types/dto/slackConfig.dto';

@Controller('slack-config')
export class SlackConfigController {
  constructor(private readonly slackConfigService: SlackConfigService){}

  @UseGuards(AuthGuard('jwn'))
  @Post()
  async registerSlackConfig(@Request() slackConfigDto: SlackConfigDto){
    return null
  }
}
