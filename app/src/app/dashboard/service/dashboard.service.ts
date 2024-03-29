import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly ENV: string = 'http://localhost:3000/';
  private readonly GET_ALL_LOADS_BY_BOOKED_FLAG = (bookedFlag) => `loads/booked/${bookedFlag}`;
  private readonly GET_ALL_AVAILABLE_LOADS = 'loads/booked/false';
  private readonly GET_ALL_LOADS_BY_SHIPPER_ID = (shipperId) => `loads/shippers/${shipperId}`;
  private readonly GET_ALL_LOADS_BY_CARRIER_ID = (carrierId) => `loads/carriers/${carrierId}`;
  private readonly GET_COMPANY_PROFILE_BY_USER_ID = (userId) => `companies/${userId}`;
  private readonly CREATE_NEW_LOAD = 'loads/';
  private readonly BOOK_LOAD = (loadId) => `loads/book/${loadId}`;
  private readonly CANCEL_LOAD = (loadId) => `loads/cancel/${loadId}`;
  private readonly REJECT_LOAD = (loadId) => `loads/reject/${loadId}`;
  private readonly CREATE_NOTIFICATION =  'notifications';

  private readonly GET_UNREAD_NOTIFICATIONS = (userId) => `notifications/${userId}`;
  private readonly MARK_AS_READ = (notificationId) => `notifications/markAsRead/${notificationId}`;
  private readonly REPORT_USER = 'reports';
  private readonly GET_REPORTS_BY_USER_ID = (userId) => `reports/${userId}`;
  private readonly GET_CITIES = 'cities/';
  private readonly GET_DISTANCE_BETWEEN_CITIES = 'cities/';
  
  public createNewLoad$: Subject<any> = new Subject<any>();
  public citiesSuggestions$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) { }

  public getCompanyByUserId(userId: string) {
    return this.httpClient.get<any>(
      this.ENV + this.GET_COMPANY_PROFILE_BY_USER_ID(userId)
    );
  }

  public createNewLoad(newLoadPayLoad: any) {
    return this.httpClient.post<any>(
      this.ENV + this.CREATE_NEW_LOAD, 
      newLoadPayLoad
    );
  }

  public cancelLoad(loadId: any, reqBody: any) {
    return this.httpClient.patch<any>(
      this.ENV + this.CANCEL_LOAD(loadId), {
        reqBody
      }
    );
  }

  public rejectLoad(loadId: any) {
    return this.httpClient.patch<any>(
      this.ENV + this.REJECT_LOAD(loadId), {}
    );
  }

  public getLoadsByShipperId(shipperId: string) {
    return this.httpClient.get<any>(
      this.ENV + this.GET_ALL_LOADS_BY_SHIPPER_ID(shipperId)
    );
  }

  public getLoadsByCarrierId(carrierId: string) {
    return this.httpClient.get<any>(
      this.ENV + this.GET_ALL_LOADS_BY_CARRIER_ID(carrierId)
    );
  }

  public getLoadsByBookedFlag(bookedFlag: boolean) {
    return this.httpClient.get<any>(
      this.ENV + this.GET_ALL_LOADS_BY_BOOKED_FLAG(bookedFlag)
    );
  }

  public getAllAvailableLoads() {
    return this.httpClient.get<any>(
      this.ENV + this.GET_ALL_AVAILABLE_LOADS
    );
  }

  public bookLoad(loadId: string, bookPayload: any) {
    return this.httpClient.patch<any>(
      this.ENV + this.BOOK_LOAD(loadId), {
        book: true,
        carrierId: bookPayload.carrierId,
        carrierCompanyLegalName: bookPayload.carrierCompanyLegalName,
        carrierEmailAddress: bookPayload.carrierEmailAddress,
        carrierPhoneNumber: bookPayload.carrierPhoneNumber
      }
    );
  }

  public createNotification(notificationPayload: any) {
    return this.httpClient.post<any>(
      this.ENV + this.CREATE_NOTIFICATION, {
        notificationPayload
      }
    );
  }

  public getUnreadNotifications(userId: string) {
    return this.httpClient.get<any>(
      this.ENV + this.GET_UNREAD_NOTIFICATIONS(userId)
    );
  }

  public reportUser(reportPayload) {
    return this.httpClient.post<any>(
      this.ENV + this.REPORT_USER, 
      reportPayload
    );
  }

  public getReportsByUserId(userId) {
    return this.httpClient.get<any>(
      this.ENV + this.GET_REPORTS_BY_USER_ID(userId)
    );
  }

  public markAsRead(notificationId) {
    return this.httpClient.patch<any>(
      this.ENV + this.MARK_AS_READ(notificationId), {}
    );
  }

  public getDistanceBetweenCities(payload: any) {
    return this.httpClient.post<any>(this.ENV + this.GET_DISTANCE_BETWEEN_CITIES, 
      payload
    );
  }

  public getCitiesSuggestions() {
    return this.httpClient.get<any>(this.ENV + this.GET_CITIES);
  }
}
