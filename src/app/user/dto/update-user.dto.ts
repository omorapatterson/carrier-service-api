import {
    IsString,
    IsIn,
    IsByteLength,
    IsEmail,
    MinLength,
    IsNumber,
} from 'class-validator';

export class UpdateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    language: string;

    @IsString()
    lastLogin?: Date;

    @IsString()
    lastName: string;

    @IsString()
    password: string;

    @IsString()
    phone: string;

    @IsString()
    verificationCode: string;

    @IsString()
    region: string;

    @IsString()
    comuna: string;

    @IsString()
    address: string;

    @IsString()
    zip: string;

    @IsString()
    shopUrl: string;

    @IsString()
    userApiChile: string;

    @IsString()
    passwordApiChile: string;

    @IsString()
    idApiChile: string;

    @IsNumber()
    correlativeNumber?: number;

    isDeleted?: boolean;

    profile?: boolean;

    @IsString()
    rut?: string;

    @IsNumber()
    recharge?: number;

    @IsString()
    labelFormat?: string;

    createdAt: Date;

    updatedAt: Date;
}
