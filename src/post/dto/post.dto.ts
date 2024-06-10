export class CreatePostDto {
  readonly title: string;
  readonly body: string;
  readonly isActive: boolean;
  readonly geoLocation: {
    latitude: number;
    longitude: number;
  };
}

export class UpdatePostDto {
  readonly title?: string;
  readonly body?: string;
  readonly isActive?: boolean;
  readonly geoLocation?: {
    latitude: number;
    longitude: number;
  };
}
