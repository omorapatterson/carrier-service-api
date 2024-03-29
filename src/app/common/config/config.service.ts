import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

export interface EnvConfig {
    [key: string]: string;
}

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor() {
        const config = dotenv.parse(fs.readFileSync(__dirname + '/../../../../.env.' + process.env.NODE_ENV));
        //const config = dotenv.parse(fs.readFileSync(__dirname + '/../../../../.env.staging' ));
        this.envConfig = this.validateInput(config);
    }

    /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            APP_PORT: Joi.number().default(3000),
            APP_VERSION: Joi.string().default('v1'),
            JWT_SECRET_KEY: Joi.string(),
            JWT_EXPIRES_IN: Joi.number().default(3600),
            SHOPIFY_API_KEY: Joi.string(),
            SHOPIFY_API_SECRET_KEY: Joi.string(),
            FORWARDING_ADDRESS: Joi.string(),
            REDIRECT_URL: Joi.string(),
            SOAP_USER: Joi.string(),
            SOAP_PASSWORD: Joi.string(),
            MAPQUEST_API_KEY: Joi.string(),
            TARIF_URL: Joi.string(),
            ADMISSION_URL: Joi.string(),
            RETIRO_URL: Joi.string(),
            LABEL_URL: Joi.string(),

            DATABASE_HOST: Joi.string(),
            DATABASE_PORT: Joi.number().default(5432),
            DATABASE_USERNAME: Joi.string().default('postgres'),
            DATABASE_PASSWORD: Joi.string().default('postgres'),
            DATABASE_NAME: Joi.string().default('cci_digipilote'),
            DATABASE_ENTITIES: Joi.string(),
            DATABASE_MIGRATIONS: Joi.string(),
            DATABASE_ENTITIES_DIR: Joi.string(),
            DATABASE_MIGRATIONS_DIR: Joi.string(),
        });

        const { error, value: validatedEnvConfig } = Joi.validate(
            envConfig,
            envVarsSchema,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}
