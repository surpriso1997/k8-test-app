import {
  IsLatitude,
  IsLongitude,
  IsString,
  Min,
  Max,
  IsNumber,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;
  @IsString()
  model: string;

  @Max(1000000)
  mileage: number;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;

  @Min(0)
  @Max(10000000)
  @IsNumber()
  price: number;
}
