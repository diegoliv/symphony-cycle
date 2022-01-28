// Building default object
var buildingObj = {
  open: false,
  uid: null,
  name: {
    value: "",
    rules: ['required'],
    valid: true,
    error: null
  },
  address1: {
    value: "",
    rules: ['required'],
    valid: true,
    error: null
  },
  address2: {
    value: "",
    rules: null,
    valid: true,
    error: null
  },
  country: {
    value: null,
    rules: null,
    valid: true,
    error: null
  },
  zip: {
    value: null,
    rules: ['required'],
    valid: true,
    error: null
  },
  google_maps: {
    value: null,
    rules: ['required'],
    valid: true,
    error: null
  },
  type: {
    value: null,
    rules: null,
    valid: true,
    error: null
  },
  days_operation: {
    value: null,
    rules: ['required'],
    valid: true,
    error: null
  },
  hours_operation: {
    value: null,
    rules: ['required'],
    valid: true,
    error: null
  },
  area: {
    value: null,
    rules: ['required', 'numeric'],
    valid: true,
    error: null
  },
  area_unit: {
    value: null,
    rules: null,
    valid: true,
    error: null
  },
  cooling: {
    value: 'yes',
    rules: ['required'],
    valid: true,
    error: null
  },
  unit_price_electricity: {
    value: null,
    rules: ['required', 'numeric'],
    valid: true,
    error: null
  },
  unit_price_heating: {
    value: null,
    rules: ['required', 'numeric'],
    valid: true,
    error: null
  },
  estimated_savings: {
    value: null,
  },
  license_cost: {
    value: null,
  },
};

/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

document.addEventListener('alpine:init', () => {
	console.log('initialized AlpineJS');
  Alpine.store('company', {
    // Company Details
    client_company: null,
    client_address: null,
    client_country: 'EU',
    client_email: null,
    client_representative_first: null,
    client_representative_last: null,
    client_buildings_num: 1,
    agreement_checked: false,
    fullName() {
    	return this.client_representative_first + ' ' + this.client_representative_last;
    },    
    // Steps
    steps: [
    	{
      	name: 'Intro',
        valid: true,
        error: null
      },
    	{
      	name: 'Your email',
        valid: false,
        error: null,
        validate(callback) {
          var valid = callback({
          	value: Alpine.store('company').client_email,
            rules: ['required', 'email']
          });
          this.valid = valid.isValid;
          this.error = valid.errorMsg;
        },
      },
    	{
      	name: 'Company Info',
        valid: false,
        error: null,
        validate(callback) {
          var valid = callback({
          	value: Alpine.store('company').client_company,
            rules: ['required']
          });
          this.valid = valid.isValid;
          this.error = valid.errorMsg;
        },
      },
    	{
      	name: 'Company Address',
        valid: true,
        error: null,
      },
    	{
      	name: 'Contact Details',
        valid: false,
        validFields: [false,false],        
        error: null,
        validate(callback) {
          var validFirst = callback({
          	value: Alpine.store('company').client_representative_first,
            rules: ['required']
          });
          var validLast = callback({
          	value: Alpine.store('company').client_representative_last,
            rules: ['required']
          });
                    
          this.validFields[0] = validFirst.isValid;
          this.validFields[1] = validLast.isValid;
          this.valid = validFirst.isValid && validLast.isValid;
          this.error = [validFirst.errorMsg, validLast.errorMsg];
        },        
      },
    	{
      	name: 'Buildings',
        valid: true,
        error: null,
      },
    	{
      	name: 'Configure Buildings',
        valid: true,
        error: null
      },
    	{
      	name: 'Total',
        valid: true,
        error: null
      },      
    	{
      	name: 'License Agreement',
        valid: false,
        error: null,
        validate(callback) {
          var valid = callback({
          	value: Alpine.store('company').agreement_checked,
            rules: ['required', 'truthy']
          });
          this.valid = valid.isValid;
          this.error = valid.errorMsg;
        },        
      },
    ],
    validationCallback(field) {
      var isValid = Iodine.isValid(field.value, field.rules);
      var errorMsg = isValid
        ? null
        : Iodine.getErrorMessage(Iodine.is(field.value, field.rules));
      return { isValid, errorMsg };
    },    
    stepIndex: 0,
    totalSteps() {
    	return this.steps.length - 1;
    },
    prevStep() {
    	if (this.stepIndex > 0) {
	    	this.stepIndex--;
  		}
    },
    nextStep() {
    	if (this.stepIndex < this.steps.length - 1 && this.currentStep().valid) {
      	if (this.stepIndex === 6) {
        }
	    	this.stepIndex++;
  		}
    },
    currentStep() {
    	return this.steps[this.stepIndex];
    },
    progressSize() {
    	var currentNum = this.stepIndex + 1;
      return (currentNum * 100 / this.steps.length);
    },
    // Buildings data
    buildings: [],
    deleteBuildingModal: false,
    currentBuildingToDelete: null,
    addBuilding() {
    	var clone = JSON.parse(JSON.stringify(buildingObj));
      clone.uid = uuidv4();
      this.buildings.push(clone);
    },
    setBuildingsAmount(amount) {
    	this.buildings = [];
    	for (var i = 1; i <= Number(amount); i++) {
      	this.addBuilding();
      }
    },
    triggerDeleteModal(index){
    	this.deleteBuildingModal = true;
      this.currentBuildingToDelete = index;
    },
    removeBuilding() {
      this.buildings.splice(this.currentBuildingToDelete, 1);
      this.deleteBuildingModal = false;
    },
    validateBuildingField(index, key) {
    	var building = this.buildings[index];
			var field = building[key];
      
      var isValid = Iodine.isValid(field.value, field.rules);
      var errorMsg = isValid
        ? null
        : Iodine.getErrorMessage(Iodine.is(field.value, field.rules));
        
      this.buildings[index][key].valid = isValid;
      this.buildings[index][key].error = errorMsg;
    },
    buildingHasErrors(building) {
      var errors = Object.keys(building).filter(function(key){
        if (typeof building[key] !== 'object' || building[key].valid === undefined) {
          return false;
        }
        return ! building[key].valid;
      });

      console.log('errors', errors);
      
      if (errors.length > 0) {
        return true;
      }
    },
    someBuildingsAreInvalid(){
      if (this.buildings.length === 0) {
        return false;
      }
      
      var self = this;
      var invalid = this.buildings.filter(function(building) {
        var hasErrors = self.buildingHasErrors(building);
        var hasEmptyFields = Object.keys(building).filter(function (key) {
          return typeof building[key] === 'object' && building[key].valid !== undefined && building[key].value && building[key].value !== '';
        }).length > 0;

        return hasErrors || hasEmptyFields;
      });
      
      if (invalid.length > 0) {
        return true;
      }
      
      return false;
    },
    buildingValues(){
    	if(this.buildings.length) {
      	return this.buildings.map(function(building){
        	var b = {};
          Object.keys(building).forEach(function (key) {
            if (key === 'open') {
              return;
            }
            if (key === 'uid') {
	            b.uid = building.uid;
            } else {
	          	b[key] = building[key].value;
            }
          })
          
          return b;
        })
      }

      return null;
    },
    toggle(index) {
      this.buildings[index].open = !this.buildings[index].open;
    },
    currencyFormat() {
    	return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'EUR' })
    },
    formatMoney(amount) {
    	return this.currencyFormat().format(amount);
    },
    totalSavings() {
      if (!this.buildingValues()) {
        return 0;
      }
      console.log(this.buildingValues());
    	return this.buildingValues().reduce(function(prev,current) {
      	return prev + Number(current.estimated_savings);
      }, 0);
    },
    totalCost() {
      if (!this.buildingValues()) {
        return 0;
      }
    	return this.buildingValues().reduce(function(prev,current) {
      	return prev + Number(current.license_cost);
      }, 0);
    },
    getFieldWithPrefix(prefix, index) {
    	if(index > 0) {
      	return (index + 1) + ':' + prefix;
      }
      return prefix;
    },
    getLicenses(callback) {
      if (!this.buildingValues()) {
        return;
      }

    	var data = {
        "client_company": this.client_company,
        "client_address_1": this.client_country,
        "client_address_2": this.client_country,
        "client_city": this.client_country,
        "client_country": this.client_country,
        "client_email": this.client_email,
        "client_representative_first": this.client_representative_first,
        "client_representative_last": this.client_representative_last,
        "agreement_checked": this.agreement_checked,
        "buildings": []        
      };
      
      this.buildingValues().forEach(function(building){
      	var b = {
          "uid": building.uid,
          "name": building.name,
          "address": {
            "country": building.country,
            "address": building.address1 + ' ' + building.address2,
            "city": building.zip,
            "google_maps": building.google_maps
          },
          "information": {
            "type": building.type,
            "days_operation": building.days_operation,
            "hours_operation": building.hours_operation,
            "area": building.area,
            "unit_price_electricity": building.unit_price_electricity,
            "unit_price_heating": building.unit_price_heating,
            "cooling": building.cooling === 'yes'
          }
        };
        
        data.push(b);
      });
      
      $.ajax({
      	url: "https://a34dd95c-6a4e-4e60-b2f7-6a9d9fccd31e.mock.pstmn.io/v1/license/calculator",
      	method: 'POST',
        contentType: "application/json",
        data: data,
      })
      .done(function(response){
      	console.log(response);
        response.per_building.forEach(function(b){
        	var buildingIndex = this.buildingValues.findIndex(function(building) {
          	return building.uid === b.uid;
          });
          
          if (buildingIndex !== -1) {
          	this.buildings[buildingIndex].estimated_savings.value = b.savings;
          	this.buildings[buildingIndex].license_cost.value = b.licence_cost;
          }
        });
        
        callback();
      });
      
      console.log(data);
    }
  });
})