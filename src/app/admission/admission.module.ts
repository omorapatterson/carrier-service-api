import { Module } from '@nestjs/common';
import { AuthModule } from '../common/auth/auth.module';
import { UserModule } from '../user/user.module';
import { SoapModule } from '../soap/soap.module';
import { AdmissionController } from './admission.controller';
import { OrderService } from '../order/order.service';
import { ManifestService } from '../manifest/manifest.service';
import { AdmissionService } from './admission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admission } from './admission.entity';
import { AdmissionRepository } from './admission.repository';
import { FulfillmentService } from '../fulfillment/fulfillment.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Admission, AdmissionRepository]),
        AuthModule,
        UserModule,
        SoapModule,
    ],
    controllers: [AdmissionController],
    providers: [
        OrderService,
        ManifestService,
        AdmissionService,
        FulfillmentService,
    ],
    exports: [AdmissionService],
})
export class AdmissionModule {}
