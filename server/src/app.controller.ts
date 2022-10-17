import { Controller, Get } from '@nestjs/common';
import { AppService, ClaimTokens, VoteDTO } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('vote')
  async vote(@Body() body: VoteDTO) {
  const result = await this.appService.vote(body);
  return { result };
  }

  @Post('claim-voting-tokens')
  async claimTokens(@Body() body: ClaimTokens) {
    const result = await this.appService.claimTokens(body); 
    return { result };
  }

  @Get('query-winner')
  queryWinner() {
    return this.appService.queryWinner();
  }

}


