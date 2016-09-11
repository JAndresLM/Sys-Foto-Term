

SELECT 
	extract(month from date_trunc('month', date_time)) "day",
	SUM(kw_produced) 
FROM 
	sys_photovoltaic 
GROUP BY 
	date_trunc('month', date_time)