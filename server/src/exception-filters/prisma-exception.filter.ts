import {
  Catch,
  ConflictException,
  UnprocessableEntityException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError): any {
    console.log(exception);

    switch (exception.code) {
      case 'P2002': {
        throw new ConflictException('Not Unique Field');
      }
      case 'P2003': {
        throw new UnprocessableEntityException('Entity Not Exist');
      }
      case 'P2025': {
        throw new NotFoundException('Cannot find');
      }
      default:
        break;
    }
    return exception;
  }
}

@Catch(Prisma.PrismaClientValidationError)
export class PrismaClientValidationFilter implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientValidationError): any {
    console.log(exception);

    throw new InternalServerErrorException('Interval server error');
  }
}
