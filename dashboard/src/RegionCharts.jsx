import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const RegionCharts = () => {
  const [regionData, setRegionData] = useState({});
  const [selectedRegion, setSelectedRegion] = useState('moscow');
  const [currentChart, setCurrentChart] = useState(null);

  const regions = [
    { id: 'adygea', name: 'Республика Адыгея', regionId: 1 },
    { id: 'bashkortostan', name: 'Республика Башкортостан', regionId: 2 },
    { id: 'buryatia', name: 'Республика Бурятия', regionId: 3 },
    { id: 'altai', name: 'Республика Алтай', regionId: 4 },
    { id: 'daghestan', name: 'Республика Дагестан', regionId: 5 },
    { id: 'ingushetia', name: 'Республика Ингушетия', regionId: 6 },
    { id: 'kabardino-balkaria', name: 'Кабардино-Балкарская Республика', regionId: 7 },
    { id: 'kalmykia', name: 'Республика Калмыкия', regionId: 8 },
    { id: 'karachay-cherkessia', name: 'Карачаево-Черкесская Республика', regionId: 9 },
    { id: 'karelia', name: 'Республика Карелия', regionId: 10 },
    { id: 'komi', name: 'Республика Коми', regionId: 11 },
    { id: 'mari-el', name: 'Республика Марий Эл', regionId: 12 },
    { id: 'mordovia', name: 'Республика Мордовия', regionId: 13 },
    { id: 'sakha', name: 'Республика Саха (Якутия)', regionId: 14 },
    { id: 'north-ossetia', name: 'Республика Северная Осетия - Алания', regionId: 15 },
    { id: 'tatarstan', name: 'Республика Татарстан (Татарстан)', regionId: 16 },
    { id: 'tuva', name: 'Республика Тыва', regionId: 17 },
    { id: 'udmurtia', name: 'Удмуртская Республика', regionId: 18 },
    { id: 'khakassia', name: 'Республика Хакасия', regionId: 19 },
    { id: 'chechnya', name: 'Чеченская Республика', regionId: 20 },
    { id: 'chuvashia', name: 'Чувашская Республика - Чувашия', regionId: 21 },
    { id: 'altai-krai', name: 'Алтайский край', regionId: 22 },
    { id: 'krasnodar-krai', name: 'Краснодарский край', regionId: 23 },
    { id: 'krasnoyarsk-krai', name: 'Красноярский край', regionId: 24 },
    { id: 'primorsky-krai', name: 'Приморский край', regionId: 25 },
    { id: 'stavropol-krai', name: 'Ставропольский край', regionId: 26 },
    { id: 'khabarovsk-krai', name: 'Хабаровский край', regionId: 27 },
    { id: 'amur-oblast', name: 'Амурская область', regionId: 28 },
    { id: 'arkhangelsk-oblast', name: 'Архангельская область', regionId: 29 },
    { id: 'astrakhan-oblast', name: 'Астраханская область', regionId: 30 },
    { id: 'belgorod-oblast', name: 'Белгородская область', regionId: 31 },
    { id: 'bryansk-oblast', name: 'Брянская область', regionId: 32 },
    { id: 'vladimir-oblast', name: 'Владимирская область', regionId: 33 },
    { id: 'volgograd-oblast', name: 'Волгоградская область', regionId: 34 },
    { id: 'vologda-oblast', name: 'Вологодская область', regionId: 35 },
    { id: 'voronezh-oblast', name: 'Воронежская область', regionId: 36 },
    { id: 'ivanovo-oblast', name: 'Ивановская область', regionId: 37 },
    { id: 'irkutsk-oblast', name: 'Иркутская область', regionId: 38 },
    { id: 'kaliningrad-oblast', name: 'Калининградская область', regionId: 39 },
    { id: 'kaluga-oblast', name: 'Калужская область', regionId: 40 },
    { id: 'kamchatka-krai', name: 'Камчатский край', regionId: 41 },
    { id: 'kemerovo-oblast', name: 'Кемеровская область', regionId: 42 },
    { id: 'kirov-oblast', name: 'Кировская область', regionId: 43 },
    { id: 'kostroma-oblast', name: 'Костромская область', regionId: 44 },
    { id: 'kurgan-oblast', name: 'Курганская область', regionId: 45 },
    { id: 'kursk-oblast', name: 'Курская область', regionId: 46 },
    { id: 'leningrad-oblast', name: 'Ленинградская область', regionId: 47 },
    { id: 'lipetsk-oblast', name: 'Липецкая область', regionId: 48 },
    { id: 'magadan-oblast', name: 'Магаданская область', regionId: 49 },
    { id: 'moscow-oblast', name: 'Московская область', regionId: 50 },
    { id: 'murmansk-oblast', name: 'Мурманская область', regionId: 51 },
    { id: 'nizhny-novgorod-oblast', name: 'Нижегородская область', regionId: 52 },
    { id: 'novgorod-oblast', name: 'Новгородская область', regionId: 53 },
    { id: 'novosibirsk-oblast', name: 'Новосибирская область', regionId: 54 },
    { id: 'omsk-oblast', name: 'Омская область', regionId: 55 },
    { id: 'orenburg-oblast', name: 'Оренбургская область', regionId: 56 },
    { id: 'orlov-oblast', name: 'Орловская область', regionId: 57 },
    { id: 'penza-oblast', name: 'Пензенская область', regionId: 58 },
    { id: 'perm-krai', name: 'Пермский край', regionId: 59 },
    { id: 'pskov-oblast', name: 'Псковская область', regionId: 60 },
    { id: 'rostov-oblast', name: 'Ростовская область', regionId: 61 },
    { id: 'ryazan-oblast', name: 'Рязанская область', regionId: 62 },
    { id: 'samara-oblast', name: 'Самарская область', regionId: 63 },
    { id: 'saratov-oblast', name: 'Саратовская область', regionId: 64 },
    { id: 'sakhalin-oblast', name: 'Сахалинская область', regionId: 65 },
    { id: 'sverdlovsk-oblast', name: 'Свердловская область', regionId: 66 },
    { id: 'smolensk-oblast', name: 'Смоленская область', regionId: 67 },
    { id: 'tambov-oblast', name: 'Тамбовская область', regionId: 68 },
    { id: 'tver-oblast', name: 'Тверская область', regionId: 69 },
    { id: 'tomsk-oblast', name: 'Томская область', regionId: 70 },
    { id: 'tula-oblast', name: 'Тульская область', regionId: 71 },
    { id: 'tyumen-oblast', name: 'Тюменская область', regionId: 72 },
    { id: 'ulyanovsk-oblast', name: 'Ульяновская область', regionId: 73 },
    { id: 'chelyabinsk-oblast', name: 'Челябинская область', regionId: 74 },
    { id: 'zabaykalsky-krai', name: 'Забайкальский край', regionId: 75 },
    { id: 'yaroslavl-oblast', name: 'Ярославская область', regionId: 76 },
    { id: 'moscow', name: 'г. Москва', regionId: 77 },
    { id: 'saint-petersburg', name: 'Санкт-Петербург', regionId: 78 },
    { id: 'jewish-autonomous-oblast', name: 'Еврейская автономная область', regionId: 79 },
    { id: 'lnr', name: 'Луганская народная республика', regionId: 80 },
    { id: 'dnr', name: 'Донецкая народная республика', regionId: 81 },
    { id: 'krim', name: 'Республика Крым', regionId: 82 },
    { id: 'nenets-autonomous-okrug', name: 'Ненецкий автономный округ', regionId: 83 },
    { id: 'xersonckaya-oblast', name: 'Херсонская область', regionId: 84 },
    { id: 'zaporozhskaya-oblast', name: 'Запорожская область', regionId: 85 },
    { id: 'khanty-mansi-autonomous-okrug', name: 'Ханты-Мансийский автономный округ - Югра', regionId: 86 },
    { id: 'chukotka-autonomous-okrug', name: 'Чукотский автономный округ', regionId: 87 },
    { id: 'yamalo-nenets-autonomous-okrug', name: 'Ямало-Ненецкий автономный округ', regionId: 89 },
    { id: 'sevastopol', name: 'Севастополь', regionId: 92 }
    
  ];

  const fetchNaturalGrowthData = async (regionId) => {
    try {
      const response = await fetch(`http://localhost:8000/natural_growth_by_year_and_region/${regionId}`);
      const result = await response.json();
      return result.natural_growth_by_year_and_region;
    } catch (error) {
      console.error('Ошибка при получении данных о приросте:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchDataForRegions = async () => {
      const data = {};
      for (const region of regions) {
        const regionData = await fetchNaturalGrowthData(region.regionId);
        data[region.id] = regionData;
      }
      setRegionData(data);
    };
    fetchDataForRegions();
  }, []);

  const renderChart = (data, chartId, regionName) => {
    const years = Array.from({ length: 22 }, (_, index) => 2002 + index);
    const formattedData = years.map(year => {
      const entry = data.find(item => item.registration_year === year);
      return {
        registration_year: year,
        opened_count: entry ? entry.opened_count : 0,
        closed_count: entry ? entry.closed_count : 0
      };
    });

    const labels = formattedData.map(item => item.registration_year);
    const difference = formattedData.map(item => item.opened_count - item.closed_count);

    const ctx = document.getElementById(chartId);
    const existingChart = Chart.getChart(ctx);

    if (existingChart) {
      existingChart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Разница между открытыми и закрытыми компаниями',
            data: difference,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              stepSize: 1,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: `Разница между открытыми и закрытыми компаниями в ${regionName} по годам`,
          },
        },
      },
    });

    setCurrentChart(newChart);
  };
  useEffect(() => {
    if (selectedRegion && regionData[selectedRegion]) {
      const { id, name } = regions.find(region => region.id === selectedRegion);
      renderChart(regionData[selectedRegion], `${id}Chart`, name);
    }
  }, [selectedRegion, regionData]);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  return (
      <div className="chart-container">
      <div>
      <div className="chart-selection">
        <select value={selectedRegion} onChange={handleRegionChange}>
          {regions.map(region => (
            <option key={region.id} value={region.id}>{region.name}</option>
          ))}
        </select>
      </div>
        {regions.map(region => (
          <div key={region.id} className={`${region.id}-chart-container`} style={{ display: selectedRegion === region.id ? 'block' : 'none' } }>
            <canvas id={`${region.id}Chart`}></canvas>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionCharts;
