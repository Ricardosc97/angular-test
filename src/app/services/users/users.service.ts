import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor() {}


  /**
   * Get the job positions list 
   *  
   */
  public async getJobPositions(){
    try{
      let response = await axios.get(
        'https://ibillboard.com/api/positions',
        {
          headers: {'Content-Type': 'application/json',}
        }
      );
      console.log(response)
      return response.data.positions;
    } catch(err){
      return err;
    }
    
  }
}
