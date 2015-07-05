$(function() {
	//wait till the page is fully loaded before loading table
	var dt = $("#sampleOrderTable").DataTable({
		 processing: true,
        serverSide: true,
        ajax: {
            "url": JS_BASE_URL + "/DatatableControl/dataTable",
            "type": "POST"
        },
        columns: [
        	{ data: "o.orderNumber" },
        	{ data: "o.orderDate" },
        	{ data: "o.status" },
        	{ data: "c.customerName" },
        	{ data: "$.contactNameFull" },
        	{ data: "c.creditLimit" }
        ]
	});
	
	//load up the column search plugin.  the data table above needs to be constructed using DataTable and not dataTable for
	//this to work.  Otherwise a JS error will occur.  
	new $.fn.dataTable.DtServerColSearch(dt, {
		select: [
			{
				name: "o.status",
				options: [
					"|--All--",
					// this could omit the pipe and just be "shipped" since they are the same.  I have left them both for sake of example.  This is useful if the DB is holding
					// a flag, but you want to display something useful to the user.  For example "S|Shipped".
					"Shipped|Shipped",
					"Cancelled|Cancelled"
				],
				header: false // we specified our own using --All-- 
			}
		]
	});
	
});
