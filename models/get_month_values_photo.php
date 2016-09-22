

SELECT 
	extract(month from date_trunc('month', date_time)) "day",
	SUM(kw_produced) 
FROM 
	sys_photovoltaic 
GROUP BY 
	date_trunc('month', date_time)

	 SELECT date_part('dow', date '2014-04-25');
	 SELECT extract(dow from date '2014-04-25');
	 select to_char(current_date, 'day');

	 https://www.techonthenet.com/postgresql/functions/date_part.php

SELECT 
	extract(dow from date_trunc('day', date_time)) "day",
	SUM(kw_produced) "suma"
FROM 
	sys_photovoltaic 
GROUP BY 
	date_trunc('day', date_time)
ORDER BY
	suma ASC

------------------------------------
SELECT to_char(date(date_time),'day') "fecha", SUM (kw_produced) "kw_produced" 
FROM (Select * FROM sys_photovoltaic  NATURAL JOIN places WHERE place_id=id_place) records 
WHERE place='C-Tec' AND date_time BETWEEN '29-08-2016 00:00:01' AND '04-09-2016 23:59:59' 
GROUP BY fecha
ORDER BY fecha;

