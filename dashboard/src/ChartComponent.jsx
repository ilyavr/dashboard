import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import './App.css'; 
import RegionCharts from './RegionCharts'; 
function ChartComponent() {
  // Состояния для хранения данных о производстве и тканях
  const [productionData, setProductionData] = useState([]);
  const [fabricData, setFabricData] = useState([]);

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    fetchProductionData();
    fetchFabricData();
  }, []);

  // Отрисовка графиков при обновлении данных о производстве
  useEffect(() => {
    if (productionData.length > 0) {
      renderFirstChart();
      renderSecondChart();
    }
  }, [productionData]);

  // Отрисовка графика при обновлении данных о тканях
  useEffect(() => {
    if (fabricData.length > 0) {
      renderThirdChart();
      renderTopFabricsChart();
    }
  }, [fabricData]);

  // Запрос данных о производстве 
  const fetchProductionData = async () => {
    try {
      const response = await fetch('http://localhost:8000/get_production_status_by_region');
      const result = await response.json();
      setProductionData(result.production_status_by_region);
    } catch (error) {
      console.error('Ошибка при получении данных по производству:', error);
    }
  };

  // Запрос данных о компаниях по тканям 
  const fetchFabricData = async () => {
    try {
      const response = await fetch('http://localhost:8000/fabric_companies_by_fabric');
      const result = await response.json();
      setFabricData(result.fabric_companies_data);
    } catch (error) {
      console.error('Ошибка при получении данных о компаниях по тканям:', error);
    }
  };

  const renderFirstChart = () => {
    const labels = productionData.map(item => item.region_name);
    const openCounts = productionData.map(item => item.open_count);
    const closedCounts = productionData.map(item => item.closed_count);

    const ctx = document.getElementById('firstChart');
    destroyChart(ctx);
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Открыто',
            data: openCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Закрыто',
            data: closedCounts,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'x',
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Статус производств по регионам',
          },
        },
      },
    });
  };

  const renderSecondChart = () => {
    const labels = productionData.map(item => item.region_name);
    const avgLifespan = productionData.map(item => item.avg_lifespan);
  
    const ctx = document.getElementById('secondChart');
    destroyChart(ctx);
    const secondChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Средний срок жизни (мес.)',
            data: avgLifespan,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',

            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',

            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Средний срок жизни компании по регионам',
          },
          datalabels: {
            anchor: 'center',
            align: 'center',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                },
              },
            },
          },
        },
        layout: {
          padding: {
            left: 50,
          },
        },
        scales: {
          y: {
            ticks: {
              display: false,
            },
          },
        },
      },
    });
  
    // Добавление дополнительной круговой диаграммы с топ-3 регионами
    const topThreeRegions = productionData
      .sort((a, b) => b.avg_lifespan - a.avg_lifespan)
      .slice(0, 3);
  
    const topThreeLabels = topThreeRegions.map(item => item.region_name);
    const topThreeAvgLifespan = topThreeRegions.map(item => item.avg_lifespan);
  
    const topThreeCtx = document.getElementById('topThreeChart');
    destroyChart(topThreeCtx);
    new Chart(topThreeCtx, {
      type: 'bar',
      data: {
        labels: topThreeLabels,
        datasets: [
          {
            data: topThreeAvgLifespan,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',

            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',

            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Топ-3 регионов по среднему сроку жизни компаний',
          },
        },
      },
    });
  
  };
  

  const renderThirdChart = () => {
    const labels = fabricData.map(item => item.fabric_name);
    const companyCounts = fabricData.map(item => item.company_count);
  
    const ctx = document.getElementById('thirdChart');
    destroyChart(ctx);
    new Chart(ctx, {
      type: 'line', 
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Количество компаний',
            data: companyCounts,
            borderColor: 'rgba(75, 192, 192, 1)', 
            backgroundColor: 'rgba(75, 192, 192, 0.2)', 
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Количество компаний по видам тканей',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Виды тканей',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Количество компаний',
            },
          },
        },
      },
    });
  };

  const renderTopFabricsChart = () => {
    // Сортировка данных о тканях и выбор топ-3
    const sortedFabricData = fabricData.slice().sort((a, b) => b.company_count - a.company_count);
    const topThreeFabrics = sortedFabricData.slice(0, 3);

    const topThreeLabels = topThreeFabrics.map(item => item.fabric_name);
    const topThreeCompanyCounts = topThreeFabrics.map(item => item.company_count);

    const ctx = document.getElementById('topThreeFabricsChart');
    destroyChart(ctx);
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: topThreeLabels,
        datasets: [
          {
            label: 'Количество компаний',
            data: topThreeCompanyCounts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',

            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Топ-3 ткани по количеству компаний',
          },
        },
      },
    });
  };
// Уничтожение существующего графика
  const destroyChart = (ctx) => {
    const chartInstance = Chart.getChart(ctx);
    if (chartInstance) {
      chartInstance.destroy();
    }
  };

  return (
    <div>
      <div className="first-chart-container">
        <canvas id="firstChart"></canvas>
      </div>
      <div className='second-chart-wrapper'>
        <div className="second-chart-container">
          <canvas id="secondChart"></canvas>
        </div>
        <div className="second-chart-top">
          <canvas id="topThreeChart"></canvas>
        </div>
      </div>
    <div className='third-chart-wrapper'>
        <div className="third-chart-container">
            <canvas id="thirdChart"></canvas>       
        </div>
        <div className="third-chart-top">
            <canvas id="topThreeFabricsChart"></canvas>       
        </div>
    </div>
            <RegionCharts /> 
    </div>


  );
}

export default ChartComponent;
