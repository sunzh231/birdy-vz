﻿(function(a){a.widget("ui.formwizard",{_init:function(){var c=this,f=this.options.formOptions.error,h=this.options.formOptions.success,e=this.options.formOptions.complete,b=this.options.formOptions.beforeSend,d=this.options.formOptions.beforeSubmit,g=this.options.formOptions.beforeSerialize;this.options.formOptions=a.extend(this.options.formOptions,{success:function(l,k,j){h&&h(l,k,j);(c.options.formOptions&&c.options.formOptions.resetForm||!c.options.formOptions)&&c._reset();c._enableNavigation()},error:function(l,k,j){f&&f(l,k,j);c._enableNavigation()},complete:function(i,j){e&&e(i,j)},beforeSubmit:function(l,m,k){if(d){var j=d(l,m,k);return j}},beforeSend:function(i){if(b){var j=b(i);return j}},beforeSerialize:function(j,k){if(g){var i=g(j,k);return i}}});this.options.historyEnabled&&a.bbq.removeState("_"+a(this.element).attr("id"));this.steps=this.element.find(".step").hide();this.firstStep=this.steps.eq(0).attr("id");this.activatedSteps=new Array;this.isLastStep=!1;this.previousStep=undefined;this.currentStep=this.steps.eq(0).attr("id");this.nextButton=this.element.find(this.options.next).click(function(){return c._next()});this.nextButtonInitinalValue=this.nextButton.val();this.nextButton.val(this.options.textNext);this.backButton=this.element.find(this.options.back).click(function(){c._back();return !1});this.backButtonInitinalValue=this.backButton.val();this.backButton.val(this.options.textBack);if(this.options.validationEnabled&&jQuery().validate==undefined){this.options.validationEnabled=!1;window.console!==undefined&&console.log("%s","validationEnabled option set, but the validation plugin is not included")}else{this.options.validationEnabled&&this.element.validate(this.options.validationOptions)}if(this.options.formPluginEnabled&&jQuery().ajaxSubmit==undefined){this.options.formPluginEnabled=!1;window.console!==undefined&&console.log("%s","formPluginEnabled option set but the form plugin is not included")}this.options.disableInputFields==1&&a(this.steps).find(":input:not('.wizard-ignore')").attr("disabled","disabled");this.options.historyEnabled&&a(window).bind("hashchange",undefined,function(j){var i=j.getState("_"+a(c.element).attr("id"))||c.firstStep;if(i!==c.currentStep){if(c.options.validationEnabled&&i===c._navigate(c.currentStep)&&!c.element.valid()){c._updateHistory(c.currentStep);c.element.validate().focusInvalid();return !1}i!==c.currentStep&&c._show(i)}});this.element.addClass("ui-formwizard");this.element.find(":input").addClass("ui-wizard-content");this.steps.addClass("ui-formwizard-content");this.backButton.addClass("ui-formwizard-button ui-wizard-content");this.nextButton.addClass("ui-formwizard-button ui-wizard-content");if(!this.options.disableUIStyles){this.element.addClass("ui-helper-reset ui-widget ui-widget-content ui-helper-reset ui-corner-all");this.element.find(":input").addClass("ui-helper-reset ui-state-default");this.steps.addClass("ui-helper-reset ui-corner-all");this.backButton.addClass("ui-helper-reset ui-state-default");this.nextButton.addClass("ui-helper-reset ui-state-default")}this._show(undefined);return a(this)},_next:function(){if(this.options.validationEnabled&&!this.element.valid()){this.element.validate().focusInvalid();return !1}if(this.options.remoteAjax!=undefined){var c=this.options.remoteAjax[this.currentStep],f=this;if(c!==undefined){var e=c.success,b=c.beforeSend,d=c.complete;c=a.extend({},c,{success:function(h,g){(e!==undefined&&e(h,g)||e==undefined)&&f._continueToNextStep()},beforeSend:function(g){f._disableNavigation();b!==undefined&&b(g);a(f.element).trigger("before_remote_ajax",{currentStep:f.currentStep})},complete:function(g,h){d!==undefined&&d(g,h);a(f.element).trigger("after_remote_ajax",{currentStep:f.currentStep});f._enableNavigation()}});this.element.ajaxSubmit(c);return !1}}return this._continueToNextStep()},_back:function(){this.activatedSteps.length>0&&(this.options.historyEnabled?this._updateHistory(this.activatedSteps[this.activatedSteps.length-2]):this._show(this.activatedSteps[this.activatedSteps.length-2],!0));return !1},_continueToNextStep:function(){if(this.isLastStep){for(var c=0;c<this.activatedSteps.length;c++){this.steps.filter("#"+this.activatedSteps[c]).find(":input").not(".wizard-ignore").removeAttr("disabled")}if(!this.options.formPluginEnabled){return !0}this._disableNavigation();this.element.ajaxSubmit(this.options.formOptions);return !1}var b=this._navigate(this.currentStep);if(b==this.currentStep){return !1}this.options.historyEnabled?this._updateHistory(b):this._show(b,!0);return !1},_updateHistory:function(b){var c={};c["_"+a(this.element).attr("id")]=b;a.bbq.pushState(c)},_disableNavigation:function(){this.nextButton.attr("disabled","disabled");this.backButton.attr("disabled","disabled");if(!this.options.disableUIStyles){this.nextButton.removeClass("ui-state-active").addClass("ui-state-disabled");this.backButton.removeClass("ui-state-active").addClass("ui-state-disabled")}},_enableNavigation:function(){this.isLastStep?this.nextButton.val(this.options.textSubmit):this.nextButton.val(this.options.textNext);this.isLastStep?a("."+this.options.otherClass).show():a("."+this.options.otherClass).hide();if(a.trim(this.currentStep)!==this.steps.eq(0).attr("id")){this.backButton.removeAttr("disabled");this.options.disableUIStyles||this.backButton.removeClass("ui-state-disabled").addClass("ui-state-active")}this.nextButton.removeAttr("disabled");this.options.disableUIStyles||this.nextButton.removeClass("ui-state-disabled").addClass("ui-state-active")},_animate:function(g,c,h){this._disableNavigation();var f=this.steps.filter("#"+g),b=this.steps.filter("#"+c);f.find(":input").not(".wizard-ignore").attr("disabled","disabled");b.find(":input").not(".wizard-ignore").removeAttr("disabled");var d=this;f.animate(d.options.outAnimation,d.options.outDuration,d.options.easing,function(){b.animate(d.options.inAnimation,d.options.inDuration,d.options.easing,function(){d.options.focusFirstInput&&b.find(":input:first").focus();d._enableNavigation();h.apply(d)});return})},_checkIflastStep:function(b){this.isLastStep=!1;if(a("#"+b).hasClass(this.options.submitStepClass)||this.steps.filter(":last").attr("id")==b){this.isLastStep=!0}},_getLink:function(b){var d=undefined,c=this.steps.filter("#"+b).find(this.options.linkClass);c!=undefined&&(c.filter(":radio,:checkbox").size()>0?d=c.filter(this.options.linkClass+":checked").val():d=a(c).val());return d},_navigate:function(c){var b=this._getLink(c);if(b!=undefined){return b!=""&&b!=null&&b!=undefined&&this.steps.filter("#"+b).attr("id")!=undefined?b:this.currentStep}if(b==undefined&&!this.isLastStep){var d=this.steps.filter("#"+c).next().attr("id");return d}},_show:function(c){var e=!1,d=c!==undefined;if(c==undefined||c==""){this.activatedSteps.pop();c=this.firstStep;this.activatedSteps.push(c)}else{if(a.inArray(c,this.activatedSteps)>-1){e=!0;this.activatedSteps.pop()}else{this.activatedSteps.push(c)}}if(this.currentStep!==c||c===this.firstStep){this.previousStep=this.currentStep;this._checkIflastStep(c);this.currentStep=c;var b=function(){d&&a(this.element).trigger("step_shown",a.extend({isBackNavigation:e},this._state()))};d&&a(this.element).trigger("before_step_shown",a.extend({isBackNavigation:e},this._state()));this._animate(this.previousStep,c,b)}},_reset:function(){this.element.resetForm();a("label,:input,textarea",this).removeClass("error");for(var b=0;b<this.activatedSteps.length;b++){this.steps.filter("#"+this.activatedSteps[b]).hide().find(":input").attr("disabled","disabled")}this.activatedSteps=new Array;this.previousStep=undefined;this.isLastStep=!1;this.options.historyEnabled?this._updateHistory(this.firstStep):this._show(this.firstStep)},_state:function(c){var b={settings:this.options,activatedSteps:this.activatedSteps,isLastStep:this.isLastStep,isFirstStep:this.currentStep===this.firstStep,previousStep:this.previousStep,currentStep:this.currentStep,backButton:this.backButton,nextButton:this.nextButton,steps:this.steps,firstStep:this.firstStep};return c!==undefined?b[c]:b},show:function(b){this.options.historyEnabled?this._updateHistory(b):this._show(b)},state:function(b){return this._state(b)},reset:function(){this._reset()},next:function(){this._next()},back:function(){this._back()},destroy:function(){this.element.find("*").removeAttr("disabled").show();this.nextButton.unbind("click").val(this.nextButtonInitinalValue).removeClass("ui-state-disabled").addClass("ui-state-active");this.backButton.unbind("click").val(this.backButtonInitinalValue).removeClass("ui-state-disabled").addClass("ui-state-active");this.backButtonInitinalValue=undefined;this.nextButtonInitinalValue=undefined;this.activatedSteps=undefined;this.previousStep=undefined;this.currentStep=undefined;this.isLastStep=undefined;this.options=undefined;this.nextButton=undefined;this.backButton=undefined;this.formwizard=undefined;this.element=undefined;this.steps=undefined;this.firstStep=undefined},update_steps:function(){this.steps=this.element.find(".step").addClass("ui-formwizard-content");this.firstStep=this.steps.eq(0).attr("id");this.steps.not("#"+this.currentStep).hide().find(":input").addClass("ui-wizard-content").attr("disabled","disabled");this._checkIflastStep(this.currentStep);this._enableNavigation();if(!this.options.disableUIStyles){this.steps.addClass("ui-helper-reset ui-corner-all");this.steps.find(":input").addClass("ui-helper-reset ui-state-default")}},options:{historyEnabled:!1,validationEnabled:!1,validationOptions:undefined,formPluginEnabled:!1,linkClass:".link",submitStepClass:"submit_step",back:":reset",next:":submit",otherClass:"other_css",textSubmit:"提交",textNext:"下一步",textBack:"后退",remoteAjax:undefined,inAnimation:{opacity:"show"},outAnimation:{opacity:"hide"},inDuration:400,outDuration:400,easing:"swing",focusFirstInput:!1,disableInputFields:!0,formOptions:{reset:!0,success:function(b){window.console!==undefined&&console.log("%s","form submit successful")},disableUIStyles:!1}}})})(jQuery);
;

;
