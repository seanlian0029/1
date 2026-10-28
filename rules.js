/* Phase 4: port of admin/generate_report.php attendance classification.
 * Calculates only; never modifies spreadsheet rows. Local school clock: Asia/Manila.
 */
window.AttendanceRules=(()=>{
'use strict';
const tm=s=>{const m=String(s||'').match(/(?:\d{4}-\d\d-\d\d\s+)?(\d{1,2}):(\d\d)(?::(\d\d))?/);return m?+m[1]*3600 + +m[2]*60 + +(m[3]||0):null;};
const t=(h,m=0,s=0)=>h*3600+m*60+s;
function calculate(log,department=''){
 const start=tm(log.time_in),end=tm(log.time_out);
 const base={status:'No Work',hours:0,elapsedHours:0,department:String(department||'').trim().toUpperCase(),isLate:false,isUndertime:false,review:false};
 if(start===null)return base;
 if(end===null)return {...base,status:'No Time Out'};
 // Original PHP uses date timestamps. Reject reverse and cross-day records for manual review.
 if(end<start)return {...base,status:'Review: Time Out precedes Time In',review:true};
 let worked=Math.floor((end-start)/3600),hours=worked,status='No Work';
 if(worked<2){status='Invalid Shift';}
 else if(base.department==='LIBRARY'){
   const morningGrace=t(8,15,59),morningLimit=t(11),morningExit=t(16,45),half1=t(12),half1Limit=t(13);
   const afternoonGrace=t(11,15,59),afternoonLimit=t(15),afternoonExit=t(19,45);
   const half2In=t(12),half2Exit=t(15,45),half2Limit=t(17),half3In=t(16),half3Grace=t(16,15);
   if(start<=morningGrace && start<morningLimit){
     if(end>=morningExit){status='On Time (Library Morning Whole Day)';hours=8;}
     else if(end>=half1 && end<half1Limit){status='On Time (Library 1st Half)';hours=4;}
     else if(end<half1){status='Undertime (Library 1st Half)';}
     else {status='Undertime (Library Morning Whole Day)';hours=worked>4?worked-1:worked;}
   } else if(start>morningGrace && start<morningLimit){
     if(end>=morningExit){status='Late (Library Morning Whole Day)';hours=worked>4?worked-1:worked;}
     else if(end>=half1 && end<half1Limit){status='Late (Library 1st Half)';hours=3;}
     else if(end<half1){status='Late, Undertime (Library 1st Half)';hours=3;}
     else {status='Late, Undertime (Library Morning Whole Day)';hours=worked>4?worked-1:worked;}
   } else if(start<=afternoonGrace && end>=afternoonExit){status='On Time (Library Afternoon Whole Day)';hours=8;}
   else if(start<=half2In && end>=half2Exit && end<half2Limit){status='On Time (Library 2nd Half)';hours=4;}
   else if(start<=half3In && start>=afternoonLimit && end>=afternoonExit){status='On Time (Library 3rd Half)';hours=4;}
   else if(start<=half2In && end<half2Exit){status='Undertime (Library 2nd Half)';hours=3;}
   else if(start<=half3In && start>=afternoonLimit && end<afternoonExit){status='Undertime (Library 3rd Half)';hours=3;}
   else if(start>afternoonGrace && start<afternoonLimit && end>=afternoonExit){status='Late (Library Afternoon Whole Day)';hours=worked>4?worked-1:worked;}
   else if(start>half2In && end>=half2Exit && end<half2Limit){status='Late (Library 2nd Half)';hours=3;}
   else if(start>half2In && end<half2Exit && end<half2Limit){status='Late, Undertime (Library 2nd Half)';hours=3;}
   else if(start>half3Grace && end>=afternoonExit){status='Late (Library 3rd Half)';hours=3;}
   else if(start>half3Grace && end<afternoonExit){status='Late, Undertime (Library 3rd Half)';hours=3;}
   else if(start<=afternoonGrace && end<afternoonExit){status='Undertime (Library Afternoon Whole Day)';hours=worked>4?worked-1:worked;}
   else {status='Late, Undertime (Library Afternoon Whole Day)';hours=worked>4?worked-1:worked;}
 } else {
   const grace=t(8,15,59),fullExit=t(16,45),half1=t(12),half2In=t(13,0,59);
   if(start<=grace){
     if(end>=fullExit){status='On Time (Regular Whole Day)';hours=8;}
     else if(end>=half1){status='On Time (Morning Half)';hours=4;}
     else {status='Undertime (Morning Half)';hours=3;}
   } else if(start>grace && start<half1){
     if(end>=fullExit){status='Late (Regular Whole Day)';hours=7;}
     else if(end>=half1){status='Late (Morning Half)';hours=3;}
     else {status='Late, Undertime (Morning Half)';hours=3;}
   } else if(start<=half2In){
     if(end>=fullExit){status='On Time (Afternoon Half)';hours=4;}
     else {status='Undertime (Afternoon Half)';hours=3;}
   } else {
     if(end>=fullExit){status='Late (Afternoon Half)';hours=3;}
     else {status='Late, Undertime (Afternoon Half)';hours=3;}
   }
 }
 // PHP rule: any Late/Undertime with >=2 elapsed whole hours becomes flexible time.
 if(worked>=2 && /Late|Undertime/i.test(status)){
   const late=/Late/i.test(status),under=/Undertime/i.test(status);
   hours=worked;
   if(start<=t(12) && end>=t(13))hours=Math.max(0,hours-1);
   status=(late&&under?'Late, Undertime':late?'Late':'Undertime')+' (Flexible Time)';
 }
 return {...base,status,hours:Math.max(0,hours),elapsedHours:worked,isLate:/Late/i.test(status),isUndertime:/Undertime/i.test(status)};
}
function summarize(items){return items.reduce((a,x)=>{a.records++;a.hours+=x.hours||0;a.late+=x.isLate?1:0;a.undertime+=x.isUndertime?1:0;a.incomplete+=x.status==='No Time Out'?1:0;a.invalid+=(x.status==='Invalid Shift'||x.review)?1:0;return a;},{records:0,hours:0,late:0,undertime:0,incomplete:0,invalid:0});}
return {calculate,summarize};
})();
