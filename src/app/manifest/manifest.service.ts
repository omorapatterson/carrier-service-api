import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

import { Manifest } from './manifest.entity';
import { ManifestRepository } from './manifest.repository';
import { ManifestDto } from './dto/create-manifest.dto';
import {
    ErrorResult,
    NotFoundResult,
    BadRequestResult,
    InternalServerErrorResult,
} from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';
import { Order } from '../order/order.entity';

@Injectable()
export class ManifestService {
    constructor(
        private readonly httpService: HttpService,
        private readonly manifestRepository: ManifestRepository,
    ) {}

    async create(manifestDto: ManifestDto, order: Order): Promise<Manifest> {
        return new Promise(
            async (
                resolve: (result: Manifest) => void,
                reject: (reason: ErrorResult) => void,
            ): Promise<void> => {
                this.manifestRepository
                    .createManifest(manifestDto, order)
                    .then((manifest: Manifest) => {
                        resolve(manifest);
                    })
                    .catch(error => {
                        reject(
                            new InternalServerErrorResult(
                                ErrorCode.GeneralError,
                                error,
                            ),
                        );
                    });
            },
        );
    }

    getQuotes() {
        return this.httpService
            .get('http://quotesondesign.com/wp-json/posts')
            .pipe(map(response => response.data));
    }

    getAcccesToken(accessTokenRequestUrl: string, accessTokenPayload: any) {
        return this.httpService
            .post(accessTokenRequestUrl, accessTokenPayload)
            .pipe(map(response => response.data));
    }

    update(id: string, manifestDto: ManifestDto): Promise<Manifest> {
        return new Promise(
            (
                resolve: (result: Manifest) => void,
                reject: (reason: ErrorResult) => void,
            ): void => {
                this.manifestRepository
                    .getManifest(id)
                    .then((Manifest: Manifest) => {
                        if (!Manifest) {
                            reject(
                                new NotFoundResult(
                                    ErrorCode.UnknownEntity,
                                    'There is no Manifest with the specified ID!',
                                ),
                            );
                            return;
                        }
                        this.manifestRepository
                            .updateManifest(id, manifestDto)
                            .then((Manifest: Manifest) => {
                                resolve(Manifest);
                            })
                            .catch(error => {
                                reject(
                                    new InternalServerErrorResult(
                                        ErrorCode.GeneralError,
                                        error,
                                    ),
                                );
                            });
                    })
                    .catch(error => {
                        reject(
                            new InternalServerErrorResult(
                                ErrorCode.GeneralError,
                                error,
                            ),
                        );
                    });
            },
        );
    }

    async getManifest(id: string): Promise<Manifest> {
        return new Promise(
            (
                resolve: (result: Manifest) => void,
                reject: (reason: ErrorResult) => void,
            ): void => {
                this.manifestRepository
                    .getManifest(id)
                    .then((manifest: Manifest) => {
                        if (!manifest) {
                            reject(
                                new NotFoundResult(
                                    ErrorCode.UnknownEntity,
                                    'There is no Manifest with the specified ID!',
                                ),
                            );
                            return;
                        }
                        resolve(manifest);
                    })
                    .catch(error => {
                        reject(
                            new InternalServerErrorResult(
                                ErrorCode.GeneralError,
                                error,
                            ),
                        );
                    });
            },
        );
    }

    getManifests(): Promise<Manifest[]> {
        return new Promise(
            (
                resolve: (result: Manifest[]) => void,
                reject: (reason: ErrorResult) => void,
            ): void => {
                this.manifestRepository
                    .getManifests()
                    .then((manifests: Manifest[]) => {
                        resolve(manifests);
                    })
                    .catch(error => {
                        reject(
                            new InternalServerErrorResult(
                                ErrorCode.GeneralError,
                                error,
                            ),
                        );
                    });
            },
        );
    }

    delete(id: string): Promise<Manifest> {
        return new Promise(
            (
                resolve: (result: Manifest) => void,
                reject: (reason: ErrorResult) => void,
            ): void => {
                this.manifestRepository
                    .getManifest(id)
                    .then((Manifest: Manifest) => {
                        if (!Manifest) {
                            reject(
                                new NotFoundResult(
                                    ErrorCode.UnknownEntity,
                                    'There is no Manifest with the specified ID!',
                                ),
                            );
                            return;
                        }
                        this.manifestRepository
                            .remove(Manifest)
                            .then((Manifest: Manifest) => {
                                if (!Manifest) {
                                    reject(
                                        new BadRequestResult(
                                            ErrorCode.UnknownError,
                                            'It can not be eliminated!',
                                        ),
                                    );
                                    return;
                                }
                                resolve(Manifest);
                            });
                    })
                    .catch(error => {
                        reject(
                            new InternalServerErrorResult(
                                ErrorCode.GeneralError,
                                error,
                            ),
                        );
                    });
            },
        );
    }
}
