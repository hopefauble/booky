import { Injectable, importProvidersFrom } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckinRequest } from './checkInRequest'
import {CheckIn} from './checkin';
import { RegistrationService } from './registration.service';
import { Observable, pipe, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  //checkIns: CheckIn[] = [];

  constructor(
    private registrationService: RegistrationService,
    private http: HttpClient) { }


  // TODO: post request
  addCheckIn(pid: number): Observable<CheckIn>{
    //let ch: CheckinRequest = {pid};
    console.log("pid = ", pid);
    return this.http.post<CheckIn>("/api/checkin", { pid });

    //this.checkIns.push(checkIn);
  }

  // getCheckIns(): Observable<CheckIn[]> {
  //   return this.http.get<CheckIn[]>("/api/checkin")
  //     .pipe(
  //       map((checkIns: CheckIn[]) => { //grab checkins
  //         return checkIns.map(checkin => //for checkin in checkins
  //           new CheckIn(new Date(checkin.checkInTime), checkin.user)
  //         );
  //       })
  //     );
  // }
  
  getCheckIns(): Observable<CheckIn[]> {
    let fixDate = (checkin: CheckIn): CheckIn =>  {
      return { user: checkin.user, created_at: new Date(checkin.created_at) };
    }
    return this.http.get<CheckIn[]>("/api/checkin").pipe(map((checkIns: CheckIn[]) => checkIns.map(checkin => fixDate(checkin))));
    // return this.http.get<CheckIn[]>("/api/checkin")
    //   .pipe(
    //     map((checkIns: CheckIn[]) => { //grab checkins
    //       checkIns.map(checkin => //for checkin in checkins
    //         { new Date(checkin.checkInTime) , checkin.user}
    //       );
    //     })
    //   );
  }
  
  getRegisteredMembers(){
    return this.registrationService.getUsers();
  }
}
