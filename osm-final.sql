--Green map of Vienna
--Look in the OSM guides all the attributes that fill with the green map of vienna and make different tables. 

SELECT *
FROM public.osm_lines;

SELECT id, geom, 'tree' AS type
FROM public.osm_points;


--SEE WHAT OSM_LINES HAVE

SELECT * FROM public.osm_lines
ORDER BY highway DESC

--Create a layer with pedestrian streets
SELECT id, geom, name, surface
INTO pedestrian FROM public.osm_lines
WHERE highway = 'pedestrian';

--Create a table with footway. I dont use it cause it just show the pavement, which is obvious footway.

SELECT id, geom, name, surface
INTO footway FROM public.osm_lines
WHERE highway = 'footway';

--Create a table with cycleways

SELECT id, geom, name, surface, segregated
INTO cycleway FROM public.osm_lines
WHERE highway = 'cycleway';

--SEE WHAT OSM_POLYGONS HAVE

SELECT * FROM public.osm_polygons
ORDER BY osm_type ASC

--See what attributes landuse have
SELECT * FROM osm_polygons
WHERE landuse = 'grass' OR landuse = 'flowerbed' OR landuse = 'vineyard' 
OR landuse = 'village_green' OR landuse ='recration_ground' OR landuse ='meadow';

--Create a table with landuse for green vienna
SELECT * INTO osm_parks FROM public.osm_polygons
WHERE landuse = 'grass' OR landuse = 'flowerbed' OR landuse = 'vineyard' 
OR landuse = 'village_green' OR landuse ='recration_ground' OR landuse ='meadow';

--Create a table with with only the columns I need from osm_parks
SELECT id, geom, osm_type, landuse, wheelchair
INTO parks from osm_parks

--Add parks in the osm_parks table

INSERT INTO osm_parks
SELECT * FROM osm_polygons
WHERE leisure = 'park';

--See if it works
SELECT * FROM public.osm_parks
WHERE leisure = 'park';

--See osm_parks
SELECT * FROM public.osm_parks

--SEE WHAT OSM_POINTS HAVE

SELECT id, geom, 'tree' AS type * INTO osm_trees 
FROM public.osm_points;

