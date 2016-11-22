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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');
var ResultComponent = (function () {
    function ResultComponent(router, route) {
        this.router = router;
        this.route = route;
    }
    ResultComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.theme = params['theme']; })
            .subscribe();
        this.route.params
            .switchMap(function (params) { return _this.totalGood = params['totalGood']; })
            .subscribe();
        this.route.params
            .switchMap(function (params) { return _this.totalQuestion = params['totalQuestion']; })
            .subscribe();
        this.pourcentage = (this.totalGood / this.totalQuestion * 100).toFixed(2);
        if (this.pourcentage <= 25) {
            this.message = "Retourne étudier";
        }
        else if (this.pourcentage > 25 && this.pourcentage <= 50) {
            this.message = "T'es capable de faire mieux!";
        }
        else if (this.pourcentage > 50 && this.pourcentage <= 75) {
            this.message = "Presque!";
        }
        else {
            this.message = "Ouhh lalaa";
        }
    };
    ResultComponent.prototype.goToDashboard = function () {
        this.router.navigate(["/dashboard"]);
    };
    ResultComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-result',
            templateUrl: '/templates/results'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_2.ActivatedRoute])
    ], ResultComponent);
    return ResultComponent;
}());
exports.ResultComponent = ResultComponent;
//# sourceMappingURL=result.component.js.map