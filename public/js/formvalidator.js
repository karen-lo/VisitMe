// Form validator script

$(document).ready(function() {
  $('#userInput').bootstrapValidator({
  	   message: 'This value is not valid',
    	feedbackIcons: {
  			valid: 'glyphicon glyphicon-ok',
  			invalid: 'glyphicon glyphicon-remove',
  			validating: 'glyphicon glyphicon-refresh'
  		},
  		submitHandler: function(validator, form, submitButton) {
  			//Do something
  		},
  		fields: {
  			firstname: {
  				validators: {
  					notEmpty: {
  						message: 'Please enter your first name.'
  					},
  					regexp: {
  						regexp: /^[A-z]+$/,
  						message: 'Please enter alphabetical letters only.'
  					}
  				}
  			},
  			lastname: {
  				validators: {
  					notEmpty: {
  						message: 'Please enter your last name.'
  					},
  					regexp: {
  						regexp: /^[A-z]+$/,
  						message: 'Please enter alphabetical letters only.'
  					}
  				}
  			},
  			age: {
  				validators: {
  					notEmpty: {
  		  			   message: 'Please enter your age.'
  				   },
  				   regexp: {
  						regexp: /^[0-9]+$/,
  						message: 'Please enter numbers only.'
  					},
  					greaterThan: {
  						value: 7,
  						inclusive: true,
  						message: 'Are you sure?'
  					},
  					lessThan: {
  						value: 100,
  						inclusive: true,
  						message: 'Let\'s be real here.'
  					}
  				}
  			},
  			gender: {
  				validators: {
  					notEmpty: {
  						message: 'Please pick a sex.'
  					}
  				}
  			}
  		}
  	});
});