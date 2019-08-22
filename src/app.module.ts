import { Module, HttpModule } from '@nestjs/common';
import { ConfigService } from './app/common/config/config.service';
//
import { UserModule } from './app/user/user.module';
import { CarrierModule } from './app/carrier-service/carrier-service.module';
import { OrderModule } from './app/oder/order.module';


@Module({
  imports: [
    HttpModule,
    UserModule,
    CarrierModule,
    OrderModule
  ],
  controllers: [],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
  ],
})
export class AppModule { }
