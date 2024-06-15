import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { convertXML } from 'simple-xml-to-json';
import MakeExternalResponse from '../dtos/MakeExternalResponse';

@Injectable()
export class MakesProxy {
  async getAll(): Promise<MakeExternalResponse[]> {
    const response = await axios.get(
      'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML',
    );
    return convertXML(response.data).Response?.children[2]?.Results?.children;
  }
}
