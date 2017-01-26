/*eslint-env jquery, browser*/
/*globals ajaxErr */
function DevList(_elemName, vccb) {
	var t={s5mini:"Vending Machine Terminal 1", iPhone:"Vending Machine Terminal 3"};
	var elemName='#'+_elemName;
	var thiz=this;
	var html=$(elemName+'-template').html().replace(/%BASE%/g, _elemName);
	$(elemName).html(html);
	function valueChanged() {
		if (vccb!== null && vccb !== undefined) vccb($(elemName+"-list").val());
	}
	$(elemName+"-list").on('change', valueChanged).prop('disabled', true);
	function getDataOK(data) {
		var opts='', i, l, m, s=[];
		for (m in data) {
			s.push(m);
		}
		s.sort();
		l=s.length;
		for (i=0; i<l; i++) {
			m=s[i];
			var t1=(t[m] === undefined)?m:t[m];
			opts += "<option value='{\"t\":\""+data[m].type+"\", \"i\":\""+m+"\"}'>"+t1+"</option>";
		}
		$(elemName+"-list").html(opts).prop('disabled', false);
		valueChanged();
    }
    $.ajax({
            url:"/tmelab/sensor",
            success:getDataOK,
            error:ajaxErr
    });
    
}