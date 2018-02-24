import { Component } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatChipInputEvent, MatChipEvent  } from "@angular/material";
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { CustomHttpService } from '../../../../services/custom.service';
import { HttpUrlService } from '../../../../services/http.url.service';
import {AssetLookup,AssetLookupType,AssetLookupTypesFeature} from '../../../../shared/models/lookup/lookup.model'

@Component({
    selector: 'look-up',
    styleUrls: ['./hardware-lookup.component.scss'],
    templateUrl: './hardware-lookup.component.html'
})
export class HardwareLookupComponent implements OnInit{
    verticalStepperStep1: FormGroup;
    verticalStepperStep2: FormGroup;
    verticalStepperStep3: FormGroup;
    verticalStepperStep1Errors: any;
    verticalStepperStep2Errors: any;
    verticalStepperStep3Errors: any;
    form:FormGroup;
    formErrors: any;
    lookup = new AssetLookup;
    lookupTypeFeaturesList  = [];
    // formBuilder:FormBuilder;

    /**
     *
     */
    constructor(private formBuilder: FormBuilder,private httpService:CustomHttpService) {
        this.formErrors = {
            company   : {},
            hardwareType:{},
            featureList:{},
            // firstName : {},
            // lastName  : {},
            property   : {},
            property2  : {},
            city      : {},
            state     : {},
            postalCode: {},
            country   : {}
        };

        // Vertical Stepper form error
        this.verticalStepperStep1Errors = {
            hardwareType:{}
            // firstName: {},             
        };

        this.verticalStepperStep2Errors = {
            property: {}
        };

        this.verticalStepperStep3Errors = {
            // city      : {},
            // state     : {},
            // postalCode: {},
            featureList:{}
        };

    }

    ngOnInit(){
        // Reactive Form
        this.form = this.formBuilder.group({
            company   : [
                {
                    value   : 'Google',
                    disabled: true
                }, Validators.required
            ],
            hardwareType:['',Validators.required],
            // firstName : ['', Validators.required],
            // lastName  : ['', Validators.required],
            property   : ['', Validators.required],
            property2  : ['', Validators.required],
            city      : ['', Validators.required],
            state     : ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.maxLength(5)]],
            country   : ['', Validators.required],
            featureList:['',Validators.required],
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

         // Vertical Stepper form stepper
         this.verticalStepperStep1 = this.formBuilder.group({
             hardwareType:['',Validators.required]
            // firstName: ['', Validators.required],
            // lastName : ['', Validators.required]
        });

        this.verticalStepperStep2 = this.formBuilder.group({
            property: ['', Validators.required]
        });

        this.verticalStepperStep3 = this.formBuilder.group({
            // city      : ['', Validators.required],
            // state     : ['', Validators.required],
            // postalCode: ['', [Validators.required, Validators.maxLength(5)]],
            featureList:['',[Validators.required]],
        });

        this.verticalStepperStep1.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.verticalStepperStep2.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.verticalStepperStep3.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
        
    }

    onFormValuesChanged()
    {
        for ( const field in this.formErrors )
        {
            if ( !this.formErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.formErrors[field] = control.errors;
            }
        }
    }


    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;

    // Enter, comma
    separatorKeysCodes = [ENTER, COMMA];

    fruits = [
        // {name: 'Lemon'},
        // {name: 'Lime'},
        // {name: 'Apple'}
    ];
    properties  = new Array<AssetLookupType>();

    add(event: MatChipInputEvent): void
    {
        let input = event.input;
        let value = event.value;
        debugger;
        // Add our person
        if ( (value || '').trim() )
        {
            if(this.fruits.length == 0)
            {
                this.fruits.push({name: value.trim()});
            }     
            else
            {
                alert('You can add only one item.');
            }       
        }

        // Reset the input value
        if ( input )
        {
            input.value = '';
        }
    }

    addProperty(event:MatChipInputEvent):void
    {
        let input = event.input;
        let value = event.value;
        let isExists : boolean = false;
        if((value || '').trim())
        {
            if(this.properties.length)
            {
                for(let i = 0; i < this.properties.length; i ++)
                {
                    let prop = this.properties[i].lookupTypeName;
                    if(prop.toLowerCase() == value.toLowerCase())
                    {   
                        isExists = true;
                        alert('Cannot have duplicate values.');
                        break;
                    }                    
                }                
            }
            if(!isExists)
            {
                let property = new AssetLookupType();
                property.lookupTypeName = value.trim();                
                this.properties.push(property);
            }
        }
        if(input)
        {
            input.value = '';
        }
    }

    remove(fruit: any): void
    {
        let index = this.fruits.indexOf(fruit);

        if ( index >= 0 )
        {
            this.fruits.splice(index, 1);
        }
    }

    removeProperty(property:any):void
    {
        let index = this.properties.indexOf(property);
        if(index >= 0)
        {
            this.properties.splice(index,1);
        }
    }

    addFeature(event:MatChipInputEvent,property:AssetLookupType):void
    {
        let input = event.input;debugger
        let value = event.value;
        let isExists : boolean = false;
        let currentProperty : AssetLookupType = this.properties.find(p => p.lookupTypeName === property.lookupTypeName);
        let index = this.properties.indexOf(currentProperty);
        if((value || '').trim())
        {
            if(currentProperty.assetLookupTypesFeature)
            {
             for(let i = 0; i < currentProperty.assetLookupTypesFeature.length; i ++)
             {
                let feature = currentProperty.assetLookupTypesFeature[i].propertyValue;
                if(feature.toLowerCase() == value.toLowerCase())
                {   
                    isExists = true;
                    alert('Cannot have duplicate values.');
                    break;
                }                    
              }
            }     

            if(!isExists)
            {
                this.properties[index].assetLookupTypesFeature.push({propertyValue:value.trim()});
            }
        }
        if(input)
        {
            input.value = '';
        }
    }

    removeFeature(property:AssetLookupType,feature:AssetLookupTypesFeature):void
    {
        let index = property.assetLookupTypesFeature.indexOf(feature);
        if(index >= 0)
        {
            property.assetLookupTypesFeature.splice(index,1);
        }
    }

    finishVerticalStepper()
    {
        this.lookup.assetLookupType = this.properties;
        this.httpService.post(HttpUrlService.referencesManagement.AddHardwareType,this.lookup).subscribe(response =>{
            console.log(response);
        })
    }

}