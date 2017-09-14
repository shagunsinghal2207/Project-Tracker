"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var UserService = (function () {
    function UserService(_http) {
        this._http = _http;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
        });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    UserService.prototype.GetUser = function (url) {
        return this._http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.CreateUser = function (url, model) {
        var body = JSON.stringify(model);
        return this._http.post(url, body, this.options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.UpdateUser = function (url, id, model) {
        var body = JSON.stringify(model);
        return this._http.put(url + id, body, this.options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //deleteUser(url: string, id: number, model: any): Observable<any> {       
    //    return this._http.delete(url + id, this.options)
    //        .map((response: Response) => <any>response.json())
    //        .catch(this.handleError);
    //}
    UserService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map