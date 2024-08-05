function Dashboard() {
  return (
    <>
      {/*  2vc10 */}
      {/* Breakpoint */}
      <div className='mx-6 mb-6 flex gap-2 text-sm text-gray-500'>
        <span>Admin</span>
        <span>/</span>
        <span>Bảng điều khiển</span>
        <span>/</span>
        <span className='text-gray-800'>Hệ thống</span>
      </div>
      <div className='px-4 pt-6'>
        <div className='grid gap-4 xl:grid-cols-2 2xl:grid-cols-3'>
          {/* Main widget */}
          <div className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 2xl:col-span-2 dark:border-gray-700 dark:bg-gray-800'>
            <div className='mb-4 flex items-center justify-between'>
              <div className='flex-shrink-0'>
                <span className='text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white'>
                  $45,385
                </span>
                <h3 className='text-base font-light text-gray-500 dark:text-gray-400'>Sales this week</h3>
              </div>
              <div className='flex flex-1 items-center justify-end text-base font-medium text-green-500 dark:text-green-400'>
                12.5%
                <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
            <div id='main-chart' style={{ minHeight: 435 }}>
              <div
                id='apexchartsxqh1yaxu'
                className='apexcharts-canvas apexchartsxqh1yaxu apexcharts-theme-light'
                style={{ width: 523, height: 420 }}
              >
                <svg
                  id='SvgjsSvg2380'
                  width={523}
                  height={420}
                  xmlns='http://www.w3.org/2000/svg'
                  version='1.1'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  className='apexcharts-svg apexcharts-zoomable hovering-zoom'
                  transform='translate(0, 0)'
                  style={{ background: 'transparent' }}
                >
                  <foreignObject x={0} y={0} width={523} height={420}>
                    <div
                      className='apexcharts-legend apexcharts-align-center apx-legend-position-bottom'
                      style={{
                        inset: 'auto 0px 1px',
                        position: 'absolute',
                        maxHeight: 210
                      }}
                    >
                      <div className='apexcharts-legend-series' style={{ margin: '2px 10px' }}>
                        <span
                          className='apexcharts-legend-marker'
                          style={{
                            background: 'rgb(26, 86, 219)',
                            color: 'rgb(26, 86, 219)',
                            height: 12,
                            width: 12,
                            left: 0,
                            top: 0,
                            borderWidth: 0,
                            borderColor: 'rgb(255, 255, 255)',
                            borderRadius: 12
                          }}
                        />
                        <span
                          className='apexcharts-legend-text'
                          i={0}
                          data:default-text='Revenue'
                          style={{
                            color: 'rgb(107, 114, 128)',
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: 'Inter, sans-serif'
                          }}
                        >
                          Revenue
                        </span>
                      </div>
                      <div className='apexcharts-legend-series' style={{ margin: '2px 10px' }}>
                        <span
                          className='apexcharts-legend-marker'
                          style={{
                            background: 'rgb(253, 186, 140)',
                            color: 'rgb(253, 186, 140)',
                            height: 12,
                            width: 12,
                            left: 0,
                            top: 0,
                            borderWidth: 0,
                            borderColor: 'rgb(255, 255, 255)',
                            borderRadius: 12
                          }}
                        />
                        <span
                          className='apexcharts-legend-text'
                          data:default-text='Revenue%20(previous%20period)'
                          style={{
                            color: 'rgb(107, 114, 128)',
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: 'Inter, sans-serif'
                          }}
                        >
                          Revenue (previous period)
                        </span>
                      </div>
                    </div>
                    <style
                      type='text/css'
                      dangerouslySetInnerHTML={{
                        __html:
                          '\t\n    \t\n      .apexcharts-legend {\t\n        display: flex;\t\n        overflow: auto;\t\n        padding: 0 10px;\t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom, .apexcharts-legend.apx-legend-position-top {\t\n        flex-wrap: wrap\t\n      }\t\n      .apexcharts-legend.apx-legend-position-right, .apexcharts-legend.apx-legend-position-left {\t\n        flex-direction: column;\t\n        bottom: 0;\t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-left, .apexcharts-legend.apx-legend-position-top.apexcharts-align-left, .apexcharts-legend.apx-legend-position-right, .apexcharts-legend.apx-legend-position-left {\t\n        justify-content: flex-start;\t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-center, .apexcharts-legend.apx-legend-position-top.apexcharts-align-center {\t\n        justify-content: center;  \t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-right, .apexcharts-legend.apx-legend-position-top.apexcharts-align-right {\t\n        justify-content: flex-end;\t\n      }\t\n      .apexcharts-legend-series {\t\n        cursor: pointer;\t\n        line-height: normal;\t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom .apexcharts-legend-series, .apexcharts-legend.apx-legend-position-top .apexcharts-legend-series{\t\n        display: flex;\t\n        align-items: center;\t\n      }\t\n      .apexcharts-legend-text {\t\n        position: relative;\t\n        font-size: 14px;\t\n      }\t\n      .apexcharts-legend-text *, .apexcharts-legend-marker * {\t\n        pointer-events: none;\t\n      }\t\n      .apexcharts-legend-marker {\t\n        position: relative;\t\n        display: inline-block;\t\n        cursor: pointer;\t\n        margin-right: 3px;\t\n        border-style: solid;\n      }\t\n      \t\n      .apexcharts-legend.apexcharts-align-right .apexcharts-legend-series, .apexcharts-legend.apexcharts-align-left .apexcharts-legend-series{\t\n        display: inline-block;\t\n      }\t\n      .apexcharts-legend-series.apexcharts-no-click {\t\n        cursor: auto;\t\n      }\t\n      .apexcharts-legend .apexcharts-hidden-zero-series, .apexcharts-legend .apexcharts-hidden-null-series {\t\n        display: none !important;\t\n      }\t\n      .apexcharts-inactive-legend {\t\n        opacity: 0.45;\t\n      }'
                      }}
                    />
                  </foreignObject>
                  <g id='SvgjsG2382' className='apexcharts-inner apexcharts-graphical' transform='translate(94, 30)'>
                    <defs id='SvgjsDefs2381'>
                      <clipPath id='gridRectMaskxqh1yaxu'>
                        <rect
                          id='SvgjsRect2388'
                          width='403.4540042877197'
                          height='315.81759814834595'
                          x={-4}
                          y={-2}
                          rx={0}
                          ry={0}
                          opacity={1}
                          strokeWidth={0}
                          stroke='none'
                          strokeDasharray={0}
                          fill='#fff'
                        />
                      </clipPath>
                      <clipPath id='forecastMaskxqh1yaxu' />
                      <clipPath id='nonForecastMaskxqh1yaxu' />
                      <clipPath id='gridRectMarkerMaskxqh1yaxu'>
                        <rect
                          id='SvgjsRect2389'
                          width='419.4540042877197'
                          height='335.81759814834595'
                          x={-12}
                          y={-12}
                          rx={0}
                          ry={0}
                          opacity={1}
                          strokeWidth={0}
                          stroke='none'
                          strokeDasharray={0}
                          fill='#fff'
                        />
                      </clipPath>
                      <linearGradient id='SvgjsLinearGradient2407' x1={0} y1={0} x2={0} y2={1}>
                        <stop id='SvgjsStop2408' stopOpacity='0.45' stopColor='rgba(26,86,219,0.45)' offset={0} />
                        <stop id='SvgjsStop2409' stopOpacity={0} stopColor='rgba(141,171,237,0)' offset={1} />
                        <stop id='SvgjsStop2410' stopOpacity={0} stopColor='rgba(141,171,237,0)' offset={1} />
                      </linearGradient>
                      <linearGradient id='SvgjsLinearGradient2429' x1={0} y1={0} x2={0} y2={1}>
                        <stop id='SvgjsStop2430' stopOpacity='0.45' stopColor='rgba(253,186,140,0.45)' offset={0} />
                        <stop id='SvgjsStop2431' stopOpacity={0} stopColor='rgba(254,221,198,0)' offset={1} />
                        <stop id='SvgjsStop2432' stopOpacity={0} stopColor='rgba(254,221,198,0)' offset={1} />
                      </linearGradient>
                    </defs>
                    <line
                      id='SvgjsLine2387'
                      x1='131.31800142923993'
                      y1={0}
                      x2='131.31800142923993'
                      y2='311.81759814834595'
                      stroke='#f3f4f6'
                      strokeDasharray={10}
                      strokeLinecap='butt'
                      className='apexcharts-xcrosshairs'
                      x='131.31800142923993'
                      y={0}
                      width={1}
                      height='311.81759814834595'
                      fill='#b1b9c4'
                      filter='none'
                      fillOpacity='0.9'
                      strokeWidth={1}
                    />
                    <g id='SvgjsG2435' className='apexcharts-xaxis' transform='translate(0, 0)'>
                      <g id='SvgjsG2436' className='apexcharts-xaxis-texts-g' transform='translate(0, -4)'>
                        <text
                          id='SvgjsText2438'
                          fontFamily='Inter, sans-serif'
                          x={0}
                          y='340.81759814834595'
                          textAnchor='middle'
                          dominantBaseline='auto'
                          fontSize='14px'
                          fontWeight={500}
                          fill='#6b7280'
                          className='apexcharts-text apexcharts-xaxis-label '
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <tspan id='SvgjsTspan2439'>01 Feb</tspan>
                          <title>01 Feb</title>
                        </text>
                        <text
                          id='SvgjsText2441'
                          fontFamily='Inter, sans-serif'
                          x='65.90900071461996'
                          y='340.81759814834595'
                          textAnchor='middle'
                          dominantBaseline='auto'
                          fontSize='14px'
                          fontWeight={500}
                          fill='#6b7280'
                          className='apexcharts-text apexcharts-xaxis-label '
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <tspan id='SvgjsTspan2442'>02 Feb</tspan>
                          <title>02 Feb</title>
                        </text>
                        <text
                          id='SvgjsText2444'
                          fontFamily='Inter, sans-serif'
                          x='131.8180014292399'
                          y='340.81759814834595'
                          textAnchor='middle'
                          dominantBaseline='auto'
                          fontSize='14px'
                          fontWeight={500}
                          fill='#6b7280'
                          className='apexcharts-text apexcharts-xaxis-label '
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <tspan id='SvgjsTspan2445'>03 Feb</tspan>
                          <title>03 Feb</title>
                        </text>
                        <text
                          id='SvgjsText2447'
                          fontFamily='Inter, sans-serif'
                          x='197.72700214385983'
                          y='340.81759814834595'
                          textAnchor='middle'
                          dominantBaseline='auto'
                          fontSize='14px'
                          fontWeight={500}
                          fill='#6b7280'
                          className='apexcharts-text apexcharts-xaxis-label '
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <tspan id='SvgjsTspan2448'>04 Feb</tspan>
                          <title>04 Feb</title>
                        </text>
                        <text
                          id='SvgjsText2450'
                          fontFamily='Inter, sans-serif'
                          x='263.63600285847974'
                          y='340.81759814834595'
                          textAnchor='middle'
                          dominantBaseline='auto'
                          fontSize='14px'
                          fontWeight={500}
                          fill='#6b7280'
                          className='apexcharts-text apexcharts-xaxis-label '
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <tspan id='SvgjsTspan2451'>05 Feb</tspan>
                          <title>05 Feb</title>
                        </text>
                        <text
                          id='SvgjsText2453'
                          fontFamily='Inter, sans-serif'
                          x='329.5450035730997'
                          y='340.81759814834595'
                          textAnchor='middle'
                          dominantBaseline='auto'
                          fontSize='14px'
                          fontWeight={500}
                          fill='#6b7280'
                          className='apexcharts-text apexcharts-xaxis-label '
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <tspan id='SvgjsTspan2454'>06 Feb</tspan>
                          <title>06 Feb</title>
                        </text>
                        <text
                          id='SvgjsText2456'
                          fontFamily='Inter, sans-serif'
                          x='395.4540042877196'
                          y='340.81759814834595'
                          textAnchor='middle'
                          dominantBaseline='auto'
                          fontSize='14px'
                          fontWeight={500}
                          fill='#6b7280'
                          className='apexcharts-text apexcharts-xaxis-label '
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <tspan id='SvgjsTspan2457'>07 Feb</tspan>
                          <title>07 Feb</title>
                        </text>
                      </g>
                      <line
                        id='SvgjsLine2458'
                        x1={0}
                        y1='312.81759814834595'
                        x2='395.4540042877197'
                        y2='312.81759814834595'
                        stroke='#f3f4f6'
                        strokeDasharray={0}
                        strokeWidth={1}
                        strokeLinecap='butt'
                      />
                    </g>
                    <g id='SvgjsG2471' className='apexcharts-grid'>
                      <g id='SvgjsG2472' className='apexcharts-gridlines-horizontal'>
                        <line
                          id='SvgjsLine2481'
                          x1={0}
                          y1={0}
                          x2='395.4540042877197'
                          y2={0}
                          stroke='#f3f4f6'
                          strokeDasharray={1}
                          strokeLinecap='butt'
                          className='apexcharts-gridline'
                        />
                        <line
                          id='SvgjsLine2482'
                          x1={0}
                          y1='77.95439953708649'
                          x2='395.4540042877197'
                          y2='77.95439953708649'
                          stroke='#f3f4f6'
                          strokeDasharray={1}
                          strokeLinecap='butt'
                          className='apexcharts-gridline'
                        />
                        <line
                          id='SvgjsLine2483'
                          x1={0}
                          y1='155.90879907417298'
                          x2='395.4540042877197'
                          y2='155.90879907417298'
                          stroke='#f3f4f6'
                          strokeDasharray={1}
                          strokeLinecap='butt'
                          className='apexcharts-gridline'
                        />
                        <line
                          id='SvgjsLine2484'
                          x1={0}
                          y1='233.86319861125946'
                          x2='395.4540042877197'
                          y2='233.86319861125946'
                          stroke='#f3f4f6'
                          strokeDasharray={1}
                          strokeLinecap='butt'
                          className='apexcharts-gridline'
                        />
                        <line
                          id='SvgjsLine2485'
                          x1={0}
                          y1='311.81759814834595'
                          x2='395.4540042877197'
                          y2='311.81759814834595'
                          stroke='#f3f4f6'
                          strokeDasharray={1}
                          strokeLinecap='butt'
                          className='apexcharts-gridline'
                        />
                      </g>
                      <g id='SvgjsG2473' className='apexcharts-gridlines-vertical' />
                      <line
                        id='SvgjsLine2474'
                        x1={0}
                        y1='312.81759814834595'
                        x2={0}
                        y2='318.81759814834595'
                        stroke='#f3f4f6'
                        strokeDasharray={0}
                        strokeLinecap='butt'
                        className='apexcharts-xaxis-tick'
                      />
                      <line
                        id='SvgjsLine2475'
                        x1='65.90900071461995'
                        y1='312.81759814834595'
                        x2='65.90900071461995'
                        y2='318.81759814834595'
                        stroke='#f3f4f6'
                        strokeDasharray={0}
                        strokeLinecap='butt'
                        className='apexcharts-xaxis-tick'
                      />
                      <line
                        id='SvgjsLine2476'
                        x1='131.8180014292399'
                        y1='312.81759814834595'
                        x2='131.8180014292399'
                        y2='318.81759814834595'
                        stroke='#f3f4f6'
                        strokeDasharray={0}
                        strokeLinecap='butt'
                        className='apexcharts-xaxis-tick'
                      />
                      <line
                        id='SvgjsLine2477'
                        x1='197.72700214385986'
                        y1='312.81759814834595'
                        x2='197.72700214385986'
                        y2='318.81759814834595'
                        stroke='#f3f4f6'
                        strokeDasharray={0}
                        strokeLinecap='butt'
                        className='apexcharts-xaxis-tick'
                      />
                      <line
                        id='SvgjsLine2478'
                        x1='263.6360028584798'
                        y1='312.81759814834595'
                        x2='263.6360028584798'
                        y2='318.81759814834595'
                        stroke='#f3f4f6'
                        strokeDasharray={0}
                        strokeLinecap='butt'
                        className='apexcharts-xaxis-tick'
                      />
                      <line
                        id='SvgjsLine2479'
                        x1='329.54500357309973'
                        y1='312.81759814834595'
                        x2='329.54500357309973'
                        y2='318.81759814834595'
                        stroke='#f3f4f6'
                        strokeDasharray={0}
                        strokeLinecap='butt'
                        className='apexcharts-xaxis-tick'
                      />
                      <line
                        id='SvgjsLine2480'
                        x1='395.45400428771967'
                        y1='312.81759814834595'
                        x2='395.45400428771967'
                        y2='318.81759814834595'
                        stroke='#f3f4f6'
                        strokeDasharray={0}
                        strokeLinecap='butt'
                        className='apexcharts-xaxis-tick'
                      />
                      <line
                        id='SvgjsLine2487'
                        x1={0}
                        y1='311.81759814834595'
                        x2='395.4540042877197'
                        y2='311.81759814834595'
                        stroke='transparent'
                        strokeDasharray={0}
                        strokeLinecap='butt'
                      />
                      <line
                        id='SvgjsLine2486'
                        x1={0}
                        y1={1}
                        x2={0}
                        y2='311.81759814834595'
                        stroke='transparent'
                        strokeDasharray={0}
                        strokeLinecap='butt'
                      />
                    </g>
                    <g id='SvgjsG2390' className='apexcharts-area-series apexcharts-plot-series'>
                      <g id='SvgjsG2391' className='apexcharts-series' seriesname='Revenue' data:longestseries='true'>
                        <path
                          id='SvgjsPath2411'
                          d='M 0 311.81759814834595L 0 173.05876697233225C 23.068150250116986 173.05876697233225 42.84085046450298 226.84730265292183 65.90900071461996 226.84730265292183C 88.97715096473695 226.84730265292183 108.74985117912294 251.01316650941862 131.81800142923993 251.01316650941862C 154.8861516793569 251.01316650941862 174.65885189374288 106.79752736580849 197.72700214385986 106.79752736580849C 220.79515239397685 106.79752736580849 240.56785260836287 173.05876697233225 263.63600285847986 173.05876697233225C 286.7041531085968 173.05876697233225 306.47685332298283 212.0359667408752 329.5450035730998 212.0359667408752C 352.61315382321675 212.0359667408752 372.38585403760277 289.99036627796204 395.4540042877197 289.99036627796204C 395.4540042877197 289.99036627796204 395.4540042877197 289.99036627796204 395.4540042877197 311.81759814834595M 395.4540042877197 289.99036627796204z'
                          fill='url(#SvgjsLinearGradient2407)'
                          fillOpacity={1}
                          strokeOpacity={1}
                          strokeLinecap='butt'
                          strokeWidth={0}
                          strokeDasharray={0}
                          className='apexcharts-area'
                          clipPath='url(#gridRectMaskxqh1yaxu)'
                        />
                        <path
                          id='SvgjsPath2412'
                          d='M 0 173.05876697233225C 23.068150250116986 173.05876697233225 42.84085046450298 226.84730265292183 65.90900071461996 226.84730265292183C 88.97715096473695 226.84730265292183 108.74985117912294 251.01316650941862 131.81800142923993 251.01316650941862C 154.8861516793569 251.01316650941862 174.65885189374288 106.79752736580849 197.72700214385986 106.79752736580849C 220.79515239397685 106.79752736580849 240.56785260836287 173.05876697233225 263.63600285847986 173.05876697233225C 286.7041531085968 173.05876697233225 306.47685332298283 212.0359667408752 329.5450035730998 212.0359667408752C 352.61315382321675 212.0359667408752 372.38585403760277 289.99036627796204 395.4540042877197 289.99036627796204'
                          fill='none'
                          fillOpacity={1}
                          stroke='#1a56db'
                          strokeOpacity={1}
                          strokeLinecap='butt'
                          strokeWidth={4}
                          strokeDasharray={0}
                          className='apexcharts-area'
                          clipPath='url(#gridRectMaskxqh1yaxu)'
                        />
                        <g id='SvgjsG2392' className='apexcharts-series-markers-wrap'>
                          <g
                            id='SvgjsG2394'
                            className='apexcharts-series-markers'
                            clipPath='url(#gridRectMarkerMaskxqh1yaxu)'
                          >
                            <circle
                              id='SvgjsCircle2395'
                              r={5}
                              cx={0}
                              cy='173.05876697233225'
                              className='apexcharts-marker no-pointer-events w8jcnf31b'
                              stroke='#ffffff'
                              fill='#1a56db'
                              fillOpacity={1}
                              strokeWidth={2}
                              strokeOpacity='0.9'
                              default-marker-size={5}
                            />
                            <circle
                              id='SvgjsCircle2396'
                              r={5}
                              cx='65.90900071461996'
                              cy='226.84730265292183'
                              className='apexcharts-marker no-pointer-events wm42luj5t'
                              stroke='#ffffff'
                              fill='#1a56db'
                              fillOpacity={1}
                              strokeWidth={2}
                              strokeOpacity='0.9'
                              default-marker-size={5}
                            />
                          </g>
                          <g
                            id='SvgjsG2397'
                            className='apexcharts-series-markers'
                            clipPath='url(#gridRectMarkerMaskxqh1yaxu)'
                          >
                            <circle
                              id='SvgjsCircle2398'
                              r={5}
                              cx='131.81800142923993'
                              cy='251.01316650941862'
                              className='apexcharts-marker no-pointer-events wpja93q8'
                              stroke='#ffffff'
                              fill='#1a56db'
                              fillOpacity={1}
                              strokeWidth={2}
                              strokeOpacity='0.9'
                              default-marker-size={5}
                            />
                          </g>
                          <g
                            id='SvgjsG2399'
                            className='apexcharts-series-markers'
                            clipPath='url(#gridRectMarkerMaskxqh1yaxu)'
                          >
                            <circle
                              id='SvgjsCircle2400'
                              r={5}
                              cx='197.72700214385986'
                              cy='106.79752736580849'
                              className='apexcharts-marker no-pointer-events w43imfdye'
                              stroke='#ffffff'
                              fill='#1a56db'
                              fillOpacity={1}
                              strokeWidth={2}
                              strokeOpacity='0.9'
                              rel={3}
                              j={3}
                              default-marker-size={5}
                            />
                          </g>
                          <g
                            id='SvgjsG2401'
                            className='apexcharts-series-markers'
                            clipPath='url(#gridRectMarkerMaskxqh1yaxu)'
                          >
                            <circle
                              id='SvgjsCircle2402'
                              r={5}
                              cx='263.63600285847986'
                              cy='173.05876697233225'
                              className='apexcharts-marker no-pointer-events w7s6ci2uu'
                              stroke='#ffffff'
                              fill='#1a56db'
                              fillOpacity={1}
                              strokeWidth={2}
                              strokeOpacity='0.9'
                              rel={4}
                              default-marker-size={5}
                            />
                          </g>
                          <g
                            id='SvgjsG2403'
                            className='apexcharts-series-markers'
                            clipPath='url(#gridRectMarkerMaskxqh1yaxu)'
                          >
                            <circle
                              id='SvgjsCircle2404'
                              r={5}
                              cx='329.5450035730998'
                              cy='212.0359667408752'
                              className='apexcharts-marker no-pointer-events wf48lofeo'
                              stroke='#ffffff'
                              fill='#1a56db'
                              fillOpacity={1}
                              strokeWidth={2}
                              strokeOpacity='0.9'
                              rel={5}
                              j={5}
                              default-marker-size={5}
                            />
                          </g>
                          <g
                            id='SvgjsG2405'
                            className='apexcharts-series-markers'
                            clipPath='url(#gridRectMarkerMaskxqh1yaxu)'
                          >
                            <circle
                              id='SvgjsCircle2406'
                              r={5}
                              cx='395.4540042877197'
                              cy='289.99036627796204'
                              className='apexcharts-marker no-pointer-events wrtpscl1z'
                              stroke='#ffffff'
                              fill='#1a56db'
                              fillOpacity={1}
                              strokeWidth={2}
                              strokeOpacity='0.9'
                              rel={6}
                              j={6}
                              default-marker-size={5}
                            />
                          </g>
                        </g>
                      </g>
                      <g
                        id='SvgjsG2413'
                        className='apexcharts-series'
                        seriesname='Revenuexxpreviousxperiodx'
                        data:longestseries='true'
                      >
                        <path
                          id='SvgjsPath2433'
                          d='M 0 311.81759814834595L 0 95.10436743524588C 23.068150250116986 95.10436743524588 42.84085046450298 29.232899826407447 65.90900071461996 29.232899826407447C 88.97715096473695 29.232899826407447 108.74985117912294 146.55427112972257 131.81800142923993 146.55427112972257C 154.8861516793569 146.55427112972257 174.65885189374288 173.05876697233225 197.72700214385986 173.05876697233225C 220.79515239397685 173.05876697233225 240.56785260836287 83.4112075046828 263.63600285847986 83.4112075046828C 286.7041531085968 83.4112075046828 306.47685332298283 17.149967898159048 329.5450035730998 17.149967898159048C 352.61315382321675 17.149967898159048 372.38585403760277 71.71804757411974 395.4540042877197 71.71804757411974C 395.4540042877197 71.71804757411974 395.4540042877197 71.71804757411974 395.4540042877197 311.81759814834595M 395.4540042877197 71.71804757411974z'
                          fill='url(#SvgjsLinearGradient2429)'
                          fillOpacity={1}
                          strokeOpacity={1}
                          strokeLinecap='butt'
                          strokeWidth={0}
                          strokeDasharray={0}
                          className='apexcharts-area'
                          clipPath='url(#gridRectMaskxqh1yaxu)'
                        />
                        <path
                          id='SvgjsPath2434'
                          d='M 0 95.10436743524588C 23.068150250116986 95.10436743524588 42.84085046450298 29.232899826407447 65.90900071461996 29.232899826407447C 88.97715096473695 29.232899826407447 108.74985117912294 146.55427112972257 131.81800142923993 146.55427112972257C 154.8861516793569 146.55427112972257 174.65885189374288 173.05876697233225 197.72700214385986 173.05876697233225C 220.79515239397685 173.05876697233225 240.56785260836287 83.4112075046828 263.63600285847986 83.4112075046828C 286.7041531085968 83.4112075046828 306.47685332298283 17.149967898159048 329.5450035730998 17.149967898159048C 352.61315382321675 17.149967898159048 372.38585403760277 71.71804757411974 395.4540042877197 71.71804757411974'
                          fill='none'
                          fillOpacity={1}
                          stroke='#fdba8c'
                          strokeOpacity={1}
                          strokeLinecap='butt'
                          strokeWidth={4}
                          strokeDasharray={0}
                          className='apexcharts-area'
                          clipPath='url(#gridRectMaskxqh1yaxu)'
                        />
                        <g id='SvgjsG2414' className='apexcharts-series-markers-wrap'>
                          <g
                            id='SvgjsG2416'
                            className='apexcharts-series-markers'
                            clipPath='url(#gridRectMarkerMaskxqh1yaxu)'
                          >
                            <circle
                              id='SvgjsCircle2417'
                              r={5}
                              cx={0}
                              cy='95.10436743524588'
                              className='apexcharts-marker no-pointer-events wjrycnfht'
                              stroke='#ffffff'
                              fill='#fdba8c'
                              fillOpacity={1}
                              strokeWidth={2}
                              strokeOpacity='0.9'
                              default-marker-size={5}
                            />
                            <circle
                              id='SvgjsCircle2418'
                              r={5}
                              cx='65.90900071461996'
                              cy='29.232899826407447'
                              className='apexcharts-marker no-pointer-events wwkaoncdf'
                              stroke='#ffffff'
                              fill='#fdba8c'
                              fillOpacity={1}
                              strokeWidth={2}
                              strokeOpacity='0.9'
                              default-marker-size={5}
                            />
                          </g>
                          <g
                            id='SvgjsG2419'
                            className='apexcharts-series-markers'
                            clipPath='url(#gridRectMarkerMaskxqh1yaxu)'
                          >
                            <circle
                              id='SvgjsCircle2420'
                              r={5}
                              cx='131.81800142923993'
                              cy='146.55427112972257'
                              className='apexcharts-marker no-pointer-events wodc8w568'
                              stroke='#ffffff'
                              fill='#fdba8c'
                              fillOpacity={1}
                              strokeWidth={2}
                              strokeOpacity='0.9'
                              default-marker-size={5}
                            />
                          </g>
                          <g
                            id='SvgjsG2421'
                            className='apexcharts-series-markers'
                            clipPath='url(#gridRectMarkerMaskxqh1yaxu)'
                          >
                            <circle
                              id='SvgjsCircle2422'
                              r={5}
                              cx='197.72700214385986'
                              cy='173.05876697233225'
                              className='apexcharts-marker no-pointer-events wsud5ngvp'
                              stroke='#ffffff'
                              fill='#fdba8c'
                              fillOpacity={1}
                              strokeWidth={2}
                              strokeOpacity='0.9'
                              rel={3}
                              j={3}
                              default-marker-size={5}
                            />
                          </g>
                          <g
                            id='SvgjsG2423'
                            className='apexcharts-series-markers'
                            clipPath='url(#gridRectMarkerMaskxqh1yaxu)'
                          >
                            <circle
                              id='SvgjsCircle2424'
                              r={5}
                              cx='263.63600285847986'
                              cy='83.4112075046828'
                              className='apexcharts-marker no-pointer-events wgjwwe6r6'
                              stroke='#ffffff'
                              fill='#fdba8c'
                              fillOpacity={1}
                              strokeWidth={2}
                              strokeOpacity='0.9'
                              rel={4}
                              default-marker-size={5}
                            />
                          </g>
                          <g
                            id='SvgjsG2425'
                            className='apexcharts-series-markers'
                            clipPath='url(#gridRectMarkerMaskxqh1yaxu)'
                          >
                            <circle
                              id='SvgjsCircle2426'
                              r={5}
                              cx='329.5450035730998'
                              cy='17.149967898159048'
                              className='apexcharts-marker no-pointer-events wgb1cco3'
                              stroke='#ffffff'
                              fill='#fdba8c'
                              fillOpacity={1}
                              strokeWidth={2}
                              strokeOpacity='0.9'
                              rel={5}
                              j={5}
                              default-marker-size={5}
                            />
                          </g>
                          <g
                            id='SvgjsG2427'
                            className='apexcharts-series-markers'
                            clipPath='url(#gridRectMarkerMaskxqh1yaxu)'
                          >
                            <circle
                              id='SvgjsCircle2428'
                              r={5}
                              cx='395.4540042877197'
                              cy='71.71804757411974'
                              className='apexcharts-marker no-pointer-events wtxljqs8m'
                              stroke='#ffffff'
                              fill='#fdba8c'
                              fillOpacity={1}
                              strokeWidth={2}
                              strokeOpacity='0.9'
                              rel={6}
                              j={6}
                              default-marker-size={5}
                            />
                          </g>
                        </g>
                      </g>
                      <g id='SvgjsG2393' className='apexcharts-datalabels' />
                      <g id='SvgjsG2415' className='apexcharts-datalabels' />
                    </g>
                    <line
                      id='SvgjsLine2488'
                      x1={0}
                      y1={0}
                      x2='395.4540042877197'
                      y2={0}
                      stroke='#b6b6b6'
                      strokeDasharray={0}
                      strokeWidth={1}
                      strokeLinecap='butt'
                      className='apexcharts-ycrosshairs'
                    />
                    <line
                      id='SvgjsLine2489'
                      x1={0}
                      y1={0}
                      x2='395.4540042877197'
                      y2={0}
                      strokeDasharray={0}
                      strokeWidth={0}
                      strokeLinecap='butt'
                      className='apexcharts-ycrosshairs-hidden'
                    />
                    <g id='SvgjsG2490' className='apexcharts-yaxis-annotations' />
                    <g id='SvgjsG2491' className='apexcharts-xaxis-annotations' />
                    <g id='SvgjsG2492' className='apexcharts-point-annotations' />
                    <rect
                      id='SvgjsRect2493'
                      width={0}
                      height={0}
                      x={0}
                      y={0}
                      rx={0}
                      ry={0}
                      opacity={1}
                      strokeWidth={0}
                      stroke='none'
                      strokeDasharray={0}
                      fill='#fefefe'
                      className='apexcharts-zoom-rect'
                    />
                    <rect
                      id='SvgjsRect2494'
                      width={0}
                      height={0}
                      x={0}
                      y={0}
                      rx={0}
                      ry={0}
                      opacity={1}
                      strokeWidth={0}
                      stroke='none'
                      strokeDasharray={0}
                      fill='#fefefe'
                      className='apexcharts-selection-rect'
                    />
                  </g>
                  <rect
                    id='SvgjsRect2386'
                    width={0}
                    height={0}
                    x={0}
                    y={0}
                    rx={0}
                    ry={0}
                    opacity={1}
                    strokeWidth={0}
                    stroke='none'
                    strokeDasharray={0}
                    fill='#fefefe'
                  />
                  <g id='SvgjsG2459' className='apexcharts-yaxis' transform='translate(41, 0)'>
                    <g id='SvgjsG2460' className='apexcharts-yaxis-texts-g'>
                      <text
                        id='SvgjsText2461'
                        fontFamily='Inter, sans-serif'
                        x={20}
                        y='31.4'
                        textAnchor='end'
                        dominantBaseline='auto'
                        fontSize='14px'
                        fontWeight={500}
                        fill='#6b7280'
                        className='apexcharts-text apexcharts-yaxis-label '
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <tspan id='SvgjsTspan2462'>$6800</tspan>
                        <title>$6800</title>
                      </text>
                      <text
                        id='SvgjsText2463'
                        fontFamily='Inter, sans-serif'
                        x={20}
                        y='109.3543995370865'
                        textAnchor='end'
                        dominantBaseline='auto'
                        fontSize='14px'
                        fontWeight={500}
                        fill='#6b7280'
                        className='apexcharts-text apexcharts-yaxis-label '
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <tspan id='SvgjsTspan2464'>$6600</tspan>
                        <title>$6600</title>
                      </text>
                      <text
                        id='SvgjsText2465'
                        fontFamily='Inter, sans-serif'
                        x={20}
                        y='187.30879907417298'
                        textAnchor='end'
                        dominantBaseline='auto'
                        fontSize='14px'
                        fontWeight={500}
                        fill='#6b7280'
                        className='apexcharts-text apexcharts-yaxis-label '
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <tspan id='SvgjsTspan2466'>$6400</tspan>
                        <title>$6400</title>
                      </text>
                      <text
                        id='SvgjsText2467'
                        fontFamily='Inter, sans-serif'
                        x={20}
                        y='265.26319861125944'
                        textAnchor='end'
                        dominantBaseline='auto'
                        fontSize='14px'
                        fontWeight={500}
                        fill='#6b7280'
                        className='apexcharts-text apexcharts-yaxis-label '
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <tspan id='SvgjsTspan2468'>$6200</tspan>
                        <title>$6200</title>
                      </text>
                      <text
                        id='SvgjsText2469'
                        fontFamily='Inter, sans-serif'
                        x={20}
                        y='343.2175981483459'
                        textAnchor='end'
                        dominantBaseline='auto'
                        fontSize='14px'
                        fontWeight={500}
                        fill='#6b7280'
                        className='apexcharts-text apexcharts-yaxis-label '
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <tspan id='SvgjsTspan2470'>$6000</tspan>
                        <title>$6000</title>
                      </text>
                    </g>
                  </g>
                  <g id='SvgjsG2383' className='apexcharts-annotations' />
                </svg>
                <div
                  className='apexcharts-tooltip apexcharts-theme-light'
                  style={{ left: '214.679px', top: '150.554px' }}
                >
                  <div className='apexcharts-tooltip-title' style={{ fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
                    03 Feb
                  </div>
                  <div
                    className='apexcharts-tooltip-series-group apexcharts-active'
                    style={{ order: 1, display: 'flex' }}
                  >
                    <span className='apexcharts-tooltip-marker' style={{ backgroundColor: 'rgb(26, 86, 219)' }} />
                    <div className='apexcharts-tooltip-text' style={{ fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
                      <div className='apexcharts-tooltip-y-group'>
                        <span className='apexcharts-tooltip-text-y-label'>Revenue: </span>
                      </div>
                      <div className='apexcharts-tooltip-goals-group'>
                        <span className='apexcharts-tooltip-text-goals-label' />
                      </div>
                      <div className='apexcharts-tooltip-z-group'>
                        <span className='apexcharts-tooltip-text-z-label' />
                      </div>
                    </div>
                  </div>
                  <div
                    className='apexcharts-tooltip-series-group apexcharts-active'
                    style={{ order: 2, display: 'flex' }}
                  >
                    <span className='apexcharts-tooltip-marker' style={{ backgroundColor: 'rgb(253, 186, 140)' }} />
                    <div className='apexcharts-tooltip-text' style={{ fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
                      <div className='apexcharts-tooltip-y-group'>
                        <span className='apexcharts-tooltip-text-y-label'>Revenue (previous period): </span>
                      </div>
                      <div className='apexcharts-tooltip-goals-group'>
                        <span className='apexcharts-tooltip-text-goals-label' />
                      </div>
                      <div className='apexcharts-tooltip-z-group'>
                        <span className='apexcharts-tooltip-text-z-label' />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className='apexcharts-xaxistooltip apexcharts-xaxistooltip-bottom apexcharts-theme-light'
                  style={{ left: '189.105px', top: '343.818px' }}
                >
                  <div
                    className='apexcharts-xaxistooltip-text'
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 12,
                      minWidth: '52.425px'
                    }}
                  >
                    03 Feb
                  </div>
                </div>
                <div className='apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light'>
                  <div className='apexcharts-yaxistooltip-text' />
                </div>
              </div>
            </div>
            {/* Card Footer */}
            <div className='mt-4 flex items-center justify-between border-t border-gray-200 pt-3 sm:pt-6 dark:border-gray-700'>
              <div>
                <button
                  className='inline-flex items-center rounded-lg p-2 text-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  type='button'
                  data-dropdown-toggle='weekly-sales-dropdown'
                >
                  Last 7 days{' '}
                  <svg
                    className='ml-2 h-4 w-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </button>
                {/* Dropdown menu */}
                <div
                  className='z-50 my-4 hidden list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700'
                  id='weekly-sales-dropdown'
                  style={{
                    position: 'absolute',
                    inset: '0px auto auto 0px',
                    margin: 0,
                    transform: 'translate3d(354.4px, 706.4px, 0px)'
                  }}
                  data-popper-placement='bottom'
                  data-popper-reference-hidden=''
                  data-popper-escaped=''
                >
                  <div className='px-4 py-3' role='none'>
                    <p className='truncate text-sm font-medium text-gray-900 dark:text-white' role='none'>
                      Sep 16, 2021 - Sep 22, 2021
                    </p>
                  </div>
                  <ul className='py-1' role='none'>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                        role='menuitem'
                      >
                        Yesterday
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                        role='menuitem'
                      >
                        Today
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                        role='menuitem'
                      >
                        Last 7 days
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                        role='menuitem'
                      >
                        Last 30 days
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                        role='menuitem'
                      >
                        Last 90 days
                      </a>
                    </li>
                  </ul>
                  <div className='py-1' role='none'>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                      role='menuitem'
                    >
                      Custom...
                    </a>
                  </div>
                </div>
              </div>
              <div className='flex-shrink-0'>
                <a
                  href='#'
                  className='text-primary-700 dark:text-primary-500 inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase hover:bg-gray-100 sm:text-sm dark:hover:bg-gray-700'
                >
                  Sales Report
                  <svg
                    className='ml-1 h-4 w-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/*Tabs widget */}
          <div className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 dark:border-gray-700 dark:bg-gray-800'>
            <h3 className='mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white'>
              Statistics this month
              <button data-popover-target='popover-description' data-popover-placement='bottom-end' type='button'>
                <svg
                  className='ml-2 h-4 w-4 text-gray-400 hover:text-gray-500'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='sr-only'>Show information</span>
              </button>
            </h3>
            <div
              data-popover=''
              id='popover-description'
              role='tooltip'
              className='invisible absolute z-10 inline-block w-72 rounded-lg border border-gray-200 bg-white text-sm font-light text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400'
              style={{
                position: 'absolute',
                inset: '0px 0px auto auto',
                margin: 0,
                transform: 'translate3d(-362.4px, 80.8px, 0px)'
              }}
              data-popper-placement='bottom-end'
              data-popper-reference-hidden=''
              data-popper-escaped=''
            >
              <div className='space-y-2 p-3'>
                <h3 className='font-semibold text-gray-900 dark:text-white'>Statistics</h3>
                <p>
                  Statistics is a branch of applied mathematics that involves the collection, description, analysis, and
                  inference of conclusions from quantitative data.
                </p>
                <a
                  href='#'
                  className='text-primary-600 dark:text-primary-500 dark:hover:text-primary-600 hover:text-primary-700 flex items-center font-medium'
                >
                  Read more{' '}
                  <svg
                    className='ml-1 h-4 w-4'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </a>
              </div>
              <div
                data-popper-arrow=''
                style={{
                  position: 'absolute',
                  left: 0,
                  transform: 'translate3d(271.2px, 0px, 0px)'
                }}
              />
            </div>
            <div className='sm:hidden'>
              <label htmlFor='tabs' className='sr-only'>
                Select tab
              </label>
              <select
                id='tabs'
                className='focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-t-lg border-0 border-b border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'
              >
                <option>Statistics</option>
                <option>Services</option>
                <option>FAQ</option>
              </select>
            </div>
            <ul
              className='hidden divide-x divide-gray-200 rounded-lg text-center text-sm font-medium text-gray-500 sm:flex dark:divide-gray-600 dark:text-gray-400'
              id='fullWidthTab'
              data-tabs-toggle='#fullWidthTabContent'
              role='tablist'
            >
              <li className='w-full'>
                <button
                  id='faq-tab'
                  data-tabs-target='#faq'
                  type='button'
                  role='tab'
                  aria-controls='faq'
                  aria-selected='true'
                  className='inline-block w-full rounded-tl-lg border-blue-600 bg-gray-50 p-4 text-blue-600 hover:bg-gray-100 hover:text-blue-600 focus:outline-none dark:border-blue-500 dark:bg-gray-700 dark:text-blue-500 dark:hover:bg-gray-600 dark:hover:text-blue-500'
                >
                  Top products
                </button>
              </li>
              <li className='w-full'>
                <button
                  id='about-tab'
                  data-tabs-target='#about'
                  type='button'
                  role='tab'
                  aria-controls='about'
                  aria-selected='false'
                  className='inline-block w-full rounded-tr-lg border-gray-100 bg-gray-50 p-4 text-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-600 focus:outline-none dark:border-gray-700 dark:border-transparent dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-300'
                >
                  Top Customers
                </button>
              </li>
            </ul>
            <div id='fullWidthTabContent' className='border-t border-gray-200 dark:border-gray-600'>
              <div className='pt-4' id='faq' role='tabpanel' aria-labelledby='faq-tab'>
                <ul role='list' className='divide-y divide-gray-200 dark:divide-gray-700'>
                  <li className='py-3 sm:py-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex min-w-0 items-center'>
                        <img
                          className='h-10 w-10 flex-shrink-0'
                          src='https://flowbite-admin-dashboard.vercel.app/images/products/iphone.png'
                          alt='imac image'
                        />
                        <div className='ml-3'>
                          <p className='truncate font-medium text-gray-900 dark:text-white'>iPhone 14 Pro</p>
                          <div className='flex flex-1 items-center justify-end text-sm text-green-500 dark:text-green-400'>
                            <svg
                              className='h-4 w-4'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                              aria-hidden='true'
                            >
                              <path
                                clipRule='evenodd'
                                fillRule='evenodd'
                                d='M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z'
                              />
                            </svg>
                            2.5%
                            <span className='ml-2 text-gray-500'>vs last month</span>
                          </div>
                        </div>
                      </div>
                      <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                        $445,467
                      </div>
                    </div>
                  </li>
                  <li className='py-3 sm:py-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex min-w-0 items-center'>
                        <img
                          className='h-10 w-10 flex-shrink-0'
                          src='https://flowbite-admin-dashboard.vercel.app/images/products/imac.png'
                          alt='imac image'
                        />
                        <div className='ml-3'>
                          <p className='truncate font-medium text-gray-900 dark:text-white'>Apple iMac 27"</p>
                          <div className='flex flex-1 items-center justify-end text-sm text-green-500 dark:text-green-400'>
                            <svg
                              className='h-4 w-4'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                              aria-hidden='true'
                            >
                              <path
                                clipRule='evenodd'
                                fillRule='evenodd'
                                d='M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z'
                              />
                            </svg>
                            12.5%
                            <span className='ml-2 text-gray-500'>vs last month</span>
                          </div>
                        </div>
                      </div>
                      <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                        $256,982
                      </div>
                    </div>
                  </li>
                  <li className='py-3 sm:py-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex min-w-0 items-center'>
                        <img
                          className='h-10 w-10 flex-shrink-0'
                          src='https://flowbite-admin-dashboard.vercel.app/images/products/watch.png'
                          alt='watch image'
                        />
                        <div className='ml-3'>
                          <p className='truncate font-medium text-gray-900 dark:text-white'>Apple Watch SE</p>
                          <div className='flex flex-1 items-center justify-end text-sm text-red-600 dark:text-red-500'>
                            <svg
                              className='h-4 w-4'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                              aria-hidden='true'
                            >
                              <path
                                clipRule='evenodd'
                                fillRule='evenodd'
                                d='M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z'
                              />
                            </svg>
                            1.35%
                            <span className='ml-2 text-gray-500'>vs last month</span>
                          </div>
                        </div>
                      </div>
                      <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                        $201,869
                      </div>
                    </div>
                  </li>
                  <li className='py-3 sm:py-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex min-w-0 items-center'>
                        <img
                          className='h-10 w-10 flex-shrink-0'
                          src='https://flowbite-admin-dashboard.vercel.app/images/products/ipad.png'
                          alt='ipad image'
                        />
                        <div className='ml-3'>
                          <p className='truncate font-medium text-gray-900 dark:text-white'>Apple iPad Air</p>
                          <div className='flex flex-1 items-center justify-end text-sm text-green-500 dark:text-green-400'>
                            <svg
                              className='h-4 w-4'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                              aria-hidden='true'
                            >
                              <path
                                clipRule='evenodd'
                                fillRule='evenodd'
                                d='M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z'
                              />
                            </svg>
                            12.5%
                            <span className='ml-2 text-gray-500'>vs last month</span>
                          </div>
                        </div>
                      </div>
                      <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                        $103,967
                      </div>
                    </div>
                  </li>
                  <li className='py-3 sm:py-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex min-w-0 items-center'>
                        <img
                          className='h-10 w-10 flex-shrink-0'
                          src='https://flowbite-admin-dashboard.vercel.app/images/products/imac.png'
                          alt='imac image'
                        />
                        <div className='ml-3'>
                          <p className='truncate font-medium text-gray-900 dark:text-white'>Apple iMac 24"</p>
                          <div className='flex flex-1 items-center justify-end text-sm text-red-600 dark:text-red-500'>
                            <svg
                              className='h-4 w-4'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                              aria-hidden='true'
                            >
                              <path
                                clipRule='evenodd'
                                fillRule='evenodd'
                                d='M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z'
                              />
                            </svg>
                            2%
                            <span className='ml-2 text-gray-500'>vs last month</span>
                          </div>
                        </div>
                      </div>
                      <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                        $98,543
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className='hidden pt-4' id='about' role='tabpanel' aria-labelledby='about-tab'>
                <ul role='list' className='divide-y divide-gray-200 dark:divide-gray-700'>
                  <li className='py-3 sm:py-4'>
                    <div className='flex items-center space-x-4'>
                      <div className='flex-shrink-0'>
                        <img
                          className='h-8 w-8 rounded-full'
                          src='https://flowbite-admin-dashboard.vercel.app/images/users/neil-sims.png'
                          alt='Neil image'
                        />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='truncate font-medium text-gray-900 dark:text-white'>Neil Sims</p>
                        <p className='truncate text-sm text-gray-500 dark:text-gray-400'>email@flowbite.com</p>
                      </div>
                      <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                        $3320
                      </div>
                    </div>
                  </li>
                  <li className='py-3 sm:py-4'>
                    <div className='flex items-center space-x-4'>
                      <div className='flex-shrink-0'>
                        <img
                          className='h-8 w-8 rounded-full'
                          src='https://flowbite-admin-dashboard.vercel.app/images/users/bonnie-green.png'
                          alt='Neil image'
                        />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='truncate font-medium text-gray-900 dark:text-white'>Bonnie Green</p>
                        <p className='truncate text-sm text-gray-500 dark:text-gray-400'>email@flowbite.com</p>
                      </div>
                      <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                        $2467
                      </div>
                    </div>
                  </li>
                  <li className='py-3 sm:py-4'>
                    <div className='flex items-center space-x-4'>
                      <div className='flex-shrink-0'>
                        <img
                          className='h-8 w-8 rounded-full'
                          src='https://flowbite-admin-dashboard.vercel.app/images/users/michael-gough.png'
                          alt='Neil image'
                        />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='truncate font-medium text-gray-900 dark:text-white'>Michael Gough</p>
                        <p className='truncate text-sm text-gray-500 dark:text-gray-400'>email@flowbite.com</p>
                      </div>
                      <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                        $2235
                      </div>
                    </div>
                  </li>
                  <li className='py-3 sm:py-4'>
                    <div className='flex items-center space-x-4'>
                      <div className='flex-shrink-0'>
                        <img
                          className='h-8 w-8 rounded-full'
                          src='https://flowbite-admin-dashboard.vercel.app/images/users/thomas-lean.png'
                          alt='Neil image'
                        />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='truncate font-medium text-gray-900 dark:text-white'>Thomes Lean</p>
                        <p className='truncate text-sm text-gray-500 dark:text-gray-400'>email@flowbite.com</p>
                      </div>
                      <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                        $1842
                      </div>
                    </div>
                  </li>
                  <li className='py-3 sm:py-4'>
                    <div className='flex items-center space-x-4'>
                      <div className='flex-shrink-0'>
                        <img
                          className='h-8 w-8 rounded-full'
                          src='https://flowbite-admin-dashboard.vercel.app/images/users/lana-byrd.png'
                          alt='Neil image'
                        />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='truncate font-medium text-gray-900 dark:text-white'>Lana Byrd</p>
                        <p className='truncate text-sm text-gray-500 dark:text-gray-400'>email@flowbite.com</p>
                      </div>
                      <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                        $1044
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* Card Footer */}
            <div className='mt-5 flex items-center justify-between border-t border-gray-200 pt-3 sm:pt-6 dark:border-gray-700'>
              <div>
                <button
                  className='inline-flex items-center rounded-lg p-2 text-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  type='button'
                  data-dropdown-toggle='stats-dropdown'
                >
                  Last 7 days{' '}
                  <svg
                    className='ml-2 h-4 w-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </button>
                {/* Dropdown menu */}
                <div
                  className='z-50 my-4 hidden list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700'
                  id='stats-dropdown'
                  style={{
                    position: 'absolute',
                    inset: '0px auto auto 0px',
                    margin: 0,
                    transform: 'translate3d(943.2px, 700px, 0px)'
                  }}
                  data-popper-placement='bottom'
                  data-popper-reference-hidden=''
                  data-popper-escaped=''
                >
                  <div className='px-4 py-3' role='none'>
                    <p className='truncate text-sm font-medium text-gray-900 dark:text-white' role='none'>
                      Sep 16, 2021 - Sep 22, 2021
                    </p>
                  </div>
                  <ul className='py-1' role='none'>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                        role='menuitem'
                      >
                        Yesterday
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                        role='menuitem'
                      >
                        Today
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                        role='menuitem'
                      >
                        Last 7 days
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                        role='menuitem'
                      >
                        Last 30 days
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                        role='menuitem'
                      >
                        Last 90 days
                      </a>
                    </li>
                  </ul>
                  <div className='py-1' role='none'>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                      role='menuitem'
                    >
                      Custom...
                    </a>
                  </div>
                </div>
              </div>
              <div className='flex-shrink-0'>
                <a
                  href='#'
                  className='text-primary-700 dark:text-primary-500 inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase hover:bg-gray-100 sm:text-sm dark:hover:bg-gray-700'
                >
                  Full Report
                  <svg
                    className='ml-1 h-4 w-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4 grid w-full grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3'>
          <div className='items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex sm:p-6 dark:border-gray-700 dark:bg-gray-800'>
            <div className='w-full'>
              <h3 className='text-base font-normal text-gray-500 dark:text-gray-400'>New products</h3>
              <span className='text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white'>2,340</span>
              <p className='flex items-center text-base font-normal text-gray-500 dark:text-gray-400'>
                <span className='mr-1.5 flex items-center text-sm text-green-500 dark:text-green-400'>
                  <svg
                    className='h-4 w-4'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                  >
                    <path
                      clipRule='evenodd'
                      fillRule='evenodd'
                      d='M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z'
                    />
                  </svg>
                  12.5%
                </span>
                Since last month
              </p>
            </div>
            <div className='w-full' id='new-products-chart' style={{ minHeight: 155 }}>
              <div
                id='apexchartss8os6aiq'
                className='apexcharts-canvas apexchartss8os6aiq apexcharts-theme-light'
                style={{ width: 261, height: 140 }}
              >
                <svg
                  id='SvgjsSvg2495'
                  width={261}
                  height={140}
                  xmlns='http://www.w3.org/2000/svg'
                  version='1.1'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  className='apexcharts-svg'
                  transform='translate(0, 0)'
                  style={{ background: 'transparent' }}
                >
                  <g id='SvgjsG2497' className='apexcharts-inner apexcharts-graphical' transform='translate(12, 30)'>
                    <defs id='SvgjsDefs2496'>
                      <linearGradient id='SvgjsLinearGradient2501' x1={0} y1={0} x2={0} y2={1}>
                        <stop id='SvgjsStop2502' stopOpacity='0.4' stopColor='rgba(216,227,240,0.4)' offset={0} />
                        <stop id='SvgjsStop2503' stopOpacity='0.5' stopColor='rgba(190,209,230,0.5)' offset={1} />
                        <stop id='SvgjsStop2504' stopOpacity='0.5' stopColor='rgba(190,209,230,0.5)' offset={1} />
                      </linearGradient>
                      <clipPath id='gridRectMasks8os6aiq'>
                        <rect
                          id='SvgjsRect2506'
                          width={248}
                          height={83}
                          x='-4.5'
                          y='-2.5'
                          rx={0}
                          ry={0}
                          opacity={1}
                          strokeWidth={0}
                          stroke='none'
                          strokeDasharray={0}
                          fill='#fff'
                        />
                      </clipPath>
                      <clipPath id='forecastMasks8os6aiq' />
                      <clipPath id='nonForecastMasks8os6aiq' />
                      <clipPath id='gridRectMarkerMasks8os6aiq'>
                        <rect
                          id='SvgjsRect2507'
                          width={243}
                          height={82}
                          x={-2}
                          y={-2}
                          rx={0}
                          ry={0}
                          opacity={1}
                          strokeWidth={0}
                          stroke='none'
                          strokeDasharray={0}
                          fill='#fff'
                        />
                      </clipPath>
                    </defs>
                    <rect
                      id='SvgjsRect2505'
                      width='30.72857142857143'
                      height={78}
                      x={0}
                      y={0}
                      rx={0}
                      ry={0}
                      opacity={1}
                      strokeWidth={0}
                      strokeDasharray={3}
                      fill='url(#SvgjsLinearGradient2501)'
                      className='apexcharts-xcrosshairs'
                      y2={78}
                      filter='none'
                      fillOpacity='0.9'
                    />
                    <g id='SvgjsG2526' className='apexcharts-xaxis' transform='translate(0, 0)'>
                      <g id='SvgjsG2527' className='apexcharts-xaxis-texts-g' transform='translate(0, 4)' />
                    </g>
                    <g id='SvgjsG2536' className='apexcharts-grid'>
                      <g id='SvgjsG2537' className='apexcharts-gridlines-horizontal' style={{ display: 'none' }}>
                        <line
                          id='SvgjsLine2539'
                          x1={0}
                          y1={0}
                          x2={239}
                          y2={0}
                          stroke='#e0e0e0'
                          strokeDasharray={0}
                          strokeLinecap='butt'
                          className='apexcharts-gridline'
                        />
                        <line
                          id='SvgjsLine2540'
                          x1={0}
                          y1='19.5'
                          x2={239}
                          y2='19.5'
                          stroke='#e0e0e0'
                          strokeDasharray={0}
                          strokeLinecap='butt'
                          className='apexcharts-gridline'
                        />
                        <line
                          id='SvgjsLine2541'
                          x1={0}
                          y1={39}
                          x2={239}
                          y2={39}
                          stroke='#e0e0e0'
                          strokeDasharray={0}
                          strokeLinecap='butt'
                          className='apexcharts-gridline'
                        />
                        <line
                          id='SvgjsLine2542'
                          x1={0}
                          y1='58.5'
                          x2={239}
                          y2='58.5'
                          stroke='#e0e0e0'
                          strokeDasharray={0}
                          strokeLinecap='butt'
                          className='apexcharts-gridline'
                        />
                        <line
                          id='SvgjsLine2543'
                          x1={0}
                          y1={78}
                          x2={239}
                          y2={78}
                          stroke='#e0e0e0'
                          strokeDasharray={0}
                          strokeLinecap='butt'
                          className='apexcharts-gridline'
                        />
                      </g>
                      <g id='SvgjsG2538' className='apexcharts-gridlines-vertical' style={{ display: 'none' }} />
                      <line
                        id='SvgjsLine2545'
                        x1={0}
                        y1={78}
                        x2={239}
                        y2={78}
                        stroke='transparent'
                        strokeDasharray={0}
                        strokeLinecap='butt'
                      />
                      <line
                        id='SvgjsLine2544'
                        x1={0}
                        y1={1}
                        x2={0}
                        y2={78}
                        stroke='transparent'
                        strokeDasharray={0}
                        strokeLinecap='butt'
                      />
                    </g>
                    <g id='SvgjsG2508' className='apexcharts-bar-series apexcharts-plot-series'>
                      <g id='SvgjsG2509' className='apexcharts-series' seriesname='Quantity'>
                        <path
                          id='SvgjsPath2513'
                          d='M 1.7071428571428573 78L 1.7071428571428573 14.700000000000003Q 1.7071428571428573 11.700000000000003 4.707142857142857 11.700000000000003L 24.43571428571429 11.700000000000003Q 27.43571428571429 11.700000000000003 27.43571428571429 14.700000000000003L 27.43571428571429 14.700000000000003L 27.43571428571429 78L 27.43571428571429 78z'
                          fill='rgba(26,86,219,1)'
                          fillOpacity={1}
                          stroke='transparent'
                          strokeOpacity={1}
                          strokeLinecap='round'
                          strokeWidth={5}
                          strokeDasharray={0}
                          className='apexcharts-bar-area'
                          clipPath='url(#gridRectMasks8os6aiq)'
                          cy='11.700000000000003'
                          cx='33.35'
                        />
                        <path
                          id='SvgjsPath2515'
                          d='M 35.85 78L 35.85 10.800000000000011Q 35.85 7.800000000000011 38.85 7.800000000000011L 58.578571428571436 7.800000000000011Q 61.578571428571436 7.800000000000011 61.578571428571436 10.800000000000011L 61.578571428571436 10.800000000000011L 61.578571428571436 78L 61.578571428571436 78z'
                          fill='rgba(26,86,219,1)'
                          fillOpacity={1}
                          stroke='transparent'
                          strokeOpacity={1}
                          strokeLinecap='round'
                          strokeWidth={5}
                          strokeDasharray={0}
                          className='apexcharts-bar-area'
                          clipPath='url(#gridRectMasks8os6aiq)'
                          cy='7.800000000000011'
                          cx='67.49285714285715'
                        />
                        <path
                          id='SvgjsPath2517'
                          d='M 69.99285714285715 78L 69.99285714285715 17.040000000000006Q 69.99285714285715 14.040000000000006 72.99285714285715 14.040000000000006L 92.72142857142858 14.040000000000006Q 95.72142857142858 14.040000000000006 95.72142857142858 17.040000000000006L 95.72142857142858 17.040000000000006L 95.72142857142858 78L 95.72142857142858 78z'
                          fill='rgba(26,86,219,1)'
                          fillOpacity={1}
                          stroke='transparent'
                          strokeOpacity={1}
                          strokeLinecap='round'
                          strokeWidth={5}
                          strokeDasharray={0}
                          className='apexcharts-bar-area'
                          clipPath='url(#gridRectMasks8os6aiq)'
                          cy='14.040000000000006'
                          cx='101.6357142857143'
                        />
                        <path
                          id='SvgjsPath2519'
                          d='M 104.1357142857143 78L 104.1357142857143 24.450000000000003Q 104.1357142857143 21.450000000000003 107.1357142857143 21.450000000000003L 126.86428571428573 21.450000000000003Q 129.86428571428573 21.450000000000003 129.86428571428573 24.450000000000003L 129.86428571428573 24.450000000000003L 129.86428571428573 78L 129.86428571428573 78z'
                          fill='rgba(26,86,219,1)'
                          fillOpacity={1}
                          stroke='transparent'
                          strokeOpacity={1}
                          strokeLinecap='round'
                          strokeWidth={5}
                          strokeDasharray={0}
                          className='apexcharts-bar-area'
                          clipPath='url(#gridRectMasks8os6aiq)'
                          cy='21.450000000000003'
                          cx='135.77857142857144'
                          j={3}
                        />
                        <path
                          id='SvgjsPath2521'
                          d='M 138.27857142857144 78L 138.27857142857144 5.340000000000003Q 138.27857142857144 2.3400000000000034 141.27857142857144 2.3400000000000034L 161.00714285714287 2.3400000000000034Q 164.00714285714287 2.3400000000000034 164.00714285714287 5.340000000000003L 164.00714285714287 5.340000000000003L 164.00714285714287 78L 164.00714285714287 78z'
                          fill='rgba(26,86,219,1)'
                          fillOpacity={1}
                          stroke='transparent'
                          strokeOpacity={1}
                          strokeLinecap='round'
                          strokeWidth={5}
                          strokeDasharray={0}
                          className='apexcharts-bar-area'
                          clipPath='url(#gridRectMasks8os6aiq)'
                          cy='2.3400000000000034'
                          cx='169.92142857142858'
                        />
                        <path
                          id='SvgjsPath2523'
                          d='M 172.42142857142858 78L 172.42142857142858 14.700000000000003Q 172.42142857142858 11.700000000000003 175.42142857142858 11.700000000000003L 195.15 11.700000000000003Q 198.15 11.700000000000003 198.15 14.700000000000003L 198.15 14.700000000000003L 198.15 78L 198.15 78z'
                          fill='rgba(26,86,219,1)'
                          fillOpacity={1}
                          stroke='transparent'
                          strokeOpacity={1}
                          strokeLinecap='round'
                          strokeWidth={5}
                          strokeDasharray={0}
                          className='apexcharts-bar-area'
                          clipPath='url(#gridRectMasks8os6aiq)'
                          cy='11.700000000000003'
                          cx='204.06428571428572'
                          j={5}
                        />
                        <path
                          id='SvgjsPath2525'
                          d='M 206.56428571428572 78L 206.56428571428572 20.550000000000004Q 206.56428571428572 17.550000000000004 209.56428571428572 17.550000000000004L 229.29285714285714 17.550000000000004Q 232.29285714285714 17.550000000000004 232.29285714285714 20.550000000000004L 232.29285714285714 20.550000000000004L 232.29285714285714 78L 232.29285714285714 78z'
                          fill='rgba(26,86,219,1)'
                          fillOpacity={1}
                          stroke='transparent'
                          strokeOpacity={1}
                          strokeLinecap='round'
                          strokeWidth={5}
                          strokeDasharray={0}
                          className='apexcharts-bar-area'
                          clipPath='url(#gridRectMasks8os6aiq)'
                          cy='17.550000000000004'
                          cx='238.20714285714286'
                          j={6}
                        />
                        <g id='SvgjsG2511' className='apexcharts-bar-goals-markers' style={{ pointerEvents: 'none' }}>
                          <g id='SvgjsG2512' className='apexcharts-bar-goals-groups' />
                          <g id='SvgjsG2514' className='apexcharts-bar-goals-groups' />
                          <g id='SvgjsG2516' className='apexcharts-bar-goals-groups' />
                          <g id='SvgjsG2518' className='apexcharts-bar-goals-groups' />
                          <g id='SvgjsG2520' className='apexcharts-bar-goals-groups' />
                          <g id='SvgjsG2522' className='apexcharts-bar-goals-groups' />
                          <g id='SvgjsG2524' className='apexcharts-bar-goals-groups' />
                        </g>
                      </g>
                      <g id='SvgjsG2510' className='apexcharts-datalabels' />
                    </g>
                    <line
                      id='SvgjsLine2546'
                      x1={0}
                      y1={0}
                      x2={239}
                      y2={0}
                      stroke='#b6b6b6'
                      strokeDasharray={0}
                      strokeWidth={1}
                      strokeLinecap='butt'
                      className='apexcharts-ycrosshairs'
                    />
                    <line
                      id='SvgjsLine2547'
                      x1={0}
                      y1={0}
                      x2={239}
                      y2={0}
                      strokeDasharray={0}
                      strokeWidth={0}
                      strokeLinecap='butt'
                      className='apexcharts-ycrosshairs-hidden'
                    />
                    <g id='SvgjsG2548' className='apexcharts-yaxis-annotations' />
                    <g id='SvgjsG2549' className='apexcharts-xaxis-annotations' />
                    <g id='SvgjsG2550' className='apexcharts-point-annotations' />
                  </g>
                  <g id='SvgjsG2535' className='apexcharts-yaxis' transform='translate(-18, 0)' />
                  <g id='SvgjsG2498' className='apexcharts-annotations' />
                </svg>
                <div className='apexcharts-legend' style={{ maxHeight: 70 }} />
                <div className='apexcharts-tooltip apexcharts-theme-light'>
                  <div className='apexcharts-tooltip-title' style={{ fontFamily: 'Inter, sans-serif', fontSize: 14 }} />
                  <div className='apexcharts-tooltip-series-group' style={{ order: 1 }}>
                    <span className='apexcharts-tooltip-marker' style={{ backgroundColor: 'rgb(26, 86, 219)' }} />
                    <div className='apexcharts-tooltip-text' style={{ fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
                      <div className='apexcharts-tooltip-y-group'>
                        <span className='apexcharts-tooltip-text-y-label' />
                      </div>
                      <div className='apexcharts-tooltip-goals-group'>
                        <span className='apexcharts-tooltip-text-goals-label' />
                      </div>
                      <div className='apexcharts-tooltip-z-group'>
                        <span className='apexcharts-tooltip-text-z-label' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light'>
                  <div className='apexcharts-yaxistooltip-text' />
                </div>
              </div>
            </div>
          </div>
          <div className='items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex sm:p-6 dark:border-gray-700 dark:bg-gray-800'>
            <div className='w-full'>
              <h3 className='text-base font-normal text-gray-500 dark:text-gray-400'>Users</h3>
              <span className='text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white'>2,340</span>
              <p className='flex items-center text-base font-normal text-gray-500 dark:text-gray-400'>
                <span className='mr-1.5 flex items-center text-sm text-green-500 dark:text-green-400'>
                  <svg
                    className='h-4 w-4'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                  >
                    <path
                      clipRule='evenodd'
                      fillRule='evenodd'
                      d='M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z'
                    />
                  </svg>
                  3,4%
                </span>
                Since last month
              </p>
            </div>
            <div className='w-full' id='week-signups-chart' style={{ minHeight: 155 }}>
              <div
                id='apexchartst0rwg4e1'
                className='apexcharts-canvas apexchartst0rwg4e1 apexcharts-theme-light'
                style={{ width: 261, height: 140 }}
              >
                <svg
                  id='SvgjsSvg2641'
                  width={261}
                  height={140}
                  xmlns='http://www.w3.org/2000/svg'
                  version='1.1'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  className='apexcharts-svg'
                  transform='translate(0, 0)'
                  style={{ background: 'transparent' }}
                >
                  <g id='SvgjsG2643' className='apexcharts-inner apexcharts-graphical' transform='translate(12, 30)'>
                    <defs id='SvgjsDefs2642'>
                      <linearGradient id='SvgjsLinearGradient2647' x1={0} y1={0} x2={0} y2={1}>
                        <stop id='SvgjsStop2648' stopOpacity='0.4' stopColor='rgba(216,227,240,0.4)' offset={0} />
                        <stop id='SvgjsStop2649' stopOpacity='0.5' stopColor='rgba(190,209,230,0.5)' offset={1} />
                        <stop id='SvgjsStop2650' stopOpacity='0.5' stopColor='rgba(190,209,230,0.5)' offset={1} />
                      </linearGradient>
                      <clipPath id='gridRectMaskt0rwg4e1'>
                        <rect
                          id='SvgjsRect2652'
                          width={243}
                          height={78}
                          x={-2}
                          y={0}
                          rx={0}
                          ry={0}
                          opacity={1}
                          strokeWidth={0}
                          stroke='none'
                          strokeDasharray={0}
                          fill='#fff'
                        />
                      </clipPath>
                      <clipPath id='forecastMaskt0rwg4e1' />
                      <clipPath id='nonForecastMaskt0rwg4e1' />
                      <clipPath id='gridRectMarkerMaskt0rwg4e1'>
                        <rect
                          id='SvgjsRect2653'
                          width={243}
                          height={82}
                          x={-2}
                          y={-2}
                          rx={0}
                          ry={0}
                          opacity={1}
                          strokeWidth={0}
                          stroke='none'
                          strokeDasharray={0}
                          fill='#fff'
                        />
                      </clipPath>
                    </defs>
                    <rect
                      id='SvgjsRect2651'
                      width='8.535714285714286'
                      height={78}
                      x={0}
                      y={0}
                      rx={0}
                      ry={0}
                      opacity={1}
                      strokeWidth={0}
                      strokeDasharray={3}
                      fill='url(#SvgjsLinearGradient2647)'
                      className='apexcharts-xcrosshairs'
                      y2={78}
                      filter='none'
                      fillOpacity='0.9'
                    />
                    <g id='SvgjsG2679' className='apexcharts-xaxis' transform='translate(0, 0)'>
                      <g id='SvgjsG2680' className='apexcharts-xaxis-texts-g' transform='translate(0, 4)' />
                    </g>
                    <g id='SvgjsG2689' className='apexcharts-grid'>
                      <g id='SvgjsG2690' className='apexcharts-gridlines-horizontal' style={{ display: 'none' }}>
                        <line
                          id='SvgjsLine2692'
                          x1={0}
                          y1={0}
                          x2={239}
                          y2={0}
                          stroke='#e0e0e0'
                          strokeDasharray={0}
                          strokeLinecap='butt'
                          className='apexcharts-gridline'
                        />
                        <line
                          id='SvgjsLine2693'
                          x1={0}
                          y1='15.6'
                          x2={239}
                          y2='15.6'
                          stroke='#e0e0e0'
                          strokeDasharray={0}
                          strokeLinecap='butt'
                          className='apexcharts-gridline'
                        />
                        <line
                          id='SvgjsLine2694'
                          x1={0}
                          y1='31.2'
                          x2={239}
                          y2='31.2'
                          stroke='#e0e0e0'
                          strokeDasharray={0}
                          strokeLinecap='butt'
                          className='apexcharts-gridline'
                        />
                        <line
                          id='SvgjsLine2695'
                          x1={0}
                          y1='46.8'
                          x2={239}
                          y2='46.8'
                          stroke='#e0e0e0'
                          strokeDasharray={0}
                          strokeLinecap='butt'
                          className='apexcharts-gridline'
                        />
                        <line
                          id='SvgjsLine2696'
                          x1={0}
                          y1='62.4'
                          x2={239}
                          y2='62.4'
                          stroke='#e0e0e0'
                          strokeDasharray={0}
                          strokeLinecap='butt'
                          className='apexcharts-gridline'
                        />
                        <line
                          id='SvgjsLine2697'
                          x1={0}
                          y1={78}
                          x2={239}
                          y2={78}
                          stroke='#e0e0e0'
                          strokeDasharray={0}
                          strokeLinecap='butt'
                          className='apexcharts-gridline'
                        />
                      </g>
                      <g id='SvgjsG2691' className='apexcharts-gridlines-vertical' style={{ display: 'none' }} />
                      <line
                        id='SvgjsLine2699'
                        x1={0}
                        y1={78}
                        x2={239}
                        y2={78}
                        stroke='transparent'
                        strokeDasharray={0}
                        strokeLinecap='butt'
                      />
                      <line
                        id='SvgjsLine2698'
                        x1={0}
                        y1={1}
                        x2={0}
                        y2={78}
                        stroke='transparent'
                        strokeDasharray={0}
                        strokeLinecap='butt'
                      />
                    </g>
                    <g id='SvgjsG2654' className='apexcharts-bar-series apexcharts-plot-series'>
                      <g id='SvgjsG2655' className='apexcharts-series'>
                        <rect
                          id='SvgjsRect2658'
                          width='8.535714285714286'
                          height={78}
                          x='12.80357142857143'
                          y={0}
                          rx={3}
                          ry={3}
                          opacity={1}
                          strokeWidth={0}
                          stroke='none'
                          strokeDasharray={0}
                          fill='#E5E7EB'
                          className='apexcharts-backgroundBar'
                        />
                        <path
                          id='SvgjsPath2660'
                          d='M 12.80357142857143 78L 12.80357142857143 46.315999999999995Q 12.80357142857143 43.315999999999995 15.80357142857143 43.315999999999995L 18.339285714285715 43.315999999999995Q 21.339285714285715 43.315999999999995 21.339285714285715 46.315999999999995L 21.339285714285715 46.315999999999995L 21.339285714285715 78L 21.339285714285715 78z'
                          fill='rgba(26,86,219,1)'
                          fillOpacity={1}
                          strokeOpacity={1}
                          strokeLinecap='round'
                          strokeWidth={0}
                          strokeDasharray={0}
                          className='apexcharts-bar-area'
                          clipPath='url(#gridRectMaskt0rwg4e1)'
                          cy='43.315999999999995'
                          cx='46.94642857142858'
                        />
                        <rect
                          id='SvgjsRect2661'
                          width='8.535714285714286'
                          height={78}
                          x='46.94642857142858'
                          y={0}
                          rx={3}
                          ry={3}
                          opacity={1}
                          strokeWidth={0}
                          stroke='none'
                          strokeDasharray={0}
                          fill='#E5E7EB'
                          className='apexcharts-backgroundBar'
                        />
                        <path
                          id='SvgjsPath2663'
                          d='M 46.94642857142858 78L 46.94642857142858 17.689999999999998Q 46.94642857142858 14.689999999999998 49.94642857142858 14.689999999999998L 52.48214285714286 14.689999999999998Q 55.48214285714286 14.689999999999998 55.48214285714286 17.689999999999998L 55.48214285714286 17.689999999999998L 55.48214285714286 78L 55.48214285714286 78z'
                          fill='rgba(26,86,219,1)'
                          fillOpacity={1}
                          strokeOpacity={1}
                          strokeLinecap='round'
                          strokeWidth={0}
                          strokeDasharray={0}
                          className='apexcharts-bar-area'
                          clipPath='url(#gridRectMaskt0rwg4e1)'
                          cy='14.689999999999998'
                          cx='81.08928571428572'
                        />
                        <rect
                          id='SvgjsRect2664'
                          width='8.535714285714286'
                          height={78}
                          x='81.08928571428572'
                          y={0}
                          rx={3}
                          ry={3}
                          opacity={1}
                          strokeWidth={0}
                          stroke='none'
                          strokeDasharray={0}
                          fill='#E5E7EB'
                          className='apexcharts-backgroundBar'
                        />
                        <path
                          id='SvgjsPath2666'
                          d='M 81.08928571428572 78L 81.08928571428572 35.422Q 81.08928571428572 32.422 84.08928571428572 32.422L 86.62500000000001 32.422Q 89.62500000000001 32.422 89.62500000000001 35.422L 89.62500000000001 35.422L 89.62500000000001 78L 89.62500000000001 78z'
                          fill='rgba(26,86,219,1)'
                          fillOpacity={1}
                          strokeOpacity={1}
                          strokeLinecap='round'
                          strokeWidth={0}
                          strokeDasharray={0}
                          className='apexcharts-bar-area'
                          clipPath='url(#gridRectMaskt0rwg4e1)'
                          cy='32.422'
                          cx='115.23214285714286'
                        />
                        <rect
                          id='SvgjsRect2667'
                          width='8.535714285714286'
                          height={78}
                          x='115.23214285714286'
                          y={0}
                          rx={3}
                          ry={3}
                          opacity={1}
                          strokeWidth={0}
                          stroke='none'
                          strokeDasharray={0}
                          fill='#E5E7EB'
                          className='apexcharts-backgroundBar'
                        />
                        <path
                          id='SvgjsPath2669'
                          d='M 115.23214285714286 78L 115.23214285714286 46.472Q 115.23214285714286 43.472 118.23214285714286 43.472L 120.76785714285715 43.472Q 123.76785714285715 43.472 123.76785714285715 46.472L 123.76785714285715 46.472L 123.76785714285715 78L 123.76785714285715 78z'
                          fill='rgba(26,86,219,1)'
                          fillOpacity={1}
                          strokeOpacity={1}
                          strokeLinecap='round'
                          strokeWidth={0}
                          strokeDasharray={0}
                          className='apexcharts-bar-area'
                          clipPath='url(#gridRectMaskt0rwg4e1)'
                          cy='43.472'
                          cx='149.375'
                        />
                        <rect
                          id='SvgjsRect2670'
                          width='8.535714285714286'
                          height={78}
                          x='149.375'
                          y={0}
                          rx={3}
                          ry={3}
                          opacity={1}
                          strokeWidth={0}
                          stroke='none'
                          strokeDasharray={0}
                          fill='#E5E7EB'
                          className='apexcharts-backgroundBar'
                        />
                        <path
                          id='SvgjsPath2672'
                          d='M 149.375 78L 149.375 50.97Q 149.375 47.97 152.375 47.97L 154.91071428571428 47.97Q 157.91071428571428 47.97 157.91071428571428 50.97L 157.91071428571428 50.97L 157.91071428571428 78L 157.91071428571428 78z'
                          fill='rgba(26,86,219,1)'
                          fillOpacity={1}
                          strokeOpacity={1}
                          strokeLinecap='round'
                          strokeWidth={0}
                          strokeDasharray={0}
                          className='apexcharts-bar-area'
                          clipPath='url(#gridRectMaskt0rwg4e1)'
                          cy='47.97'
                          cx='183.51785714285714'
                        />
                        <rect
                          id='SvgjsRect2673'
                          width='8.535714285714286'
                          height={78}
                          x='183.51785714285714'
                          y={0}
                          rx={3}
                          ry={3}
                          opacity={1}
                          strokeWidth={0}
                          stroke='none'
                          strokeDasharray={0}
                          fill='#E5E7EB'
                          className='apexcharts-backgroundBar'
                        />
                        <path
                          id='SvgjsPath2675'
                          d='M 183.51785714285714 78L 183.51785714285714 38.568Q 183.51785714285714 35.568 186.51785714285714 35.568L 189.05357142857142 35.568Q 192.05357142857142 35.568 192.05357142857142 38.568L 192.05357142857142 38.568L 192.05357142857142 78L 192.05357142857142 78z'
                          fill='rgba(26,86,219,1)'
                          fillOpacity={1}
                          strokeOpacity={1}
                          strokeLinecap='round'
                          strokeWidth={0}
                          strokeDasharray={0}
                          className='apexcharts-bar-area'
                          clipPath='url(#gridRectMaskt0rwg4e1)'
                          cy='35.568'
                          cx='217.66071428571428'
                          j={5}
                        />
                        <rect
                          id='SvgjsRect2676'
                          width='8.535714285714286'
                          height={78}
                          x='217.66071428571428'
                          y={0}
                          rx={3}
                          ry={3}
                          opacity={1}
                          strokeWidth={0}
                          stroke='none'
                          strokeDasharray={0}
                          fill='#E5E7EB'
                          className='apexcharts-backgroundBar'
                        />
                        <path
                          id='SvgjsPath2678'
                          d='M 217.66071428571428 78L 217.66071428571428 46.263999999999996Q 217.66071428571428 43.263999999999996 220.66071428571428 43.263999999999996L 223.19642857142856 43.263999999999996Q 226.19642857142856 43.263999999999996 226.19642857142856 46.263999999999996L 226.19642857142856 46.263999999999996L 226.19642857142856 78L 226.19642857142856 78z'
                          fill='rgba(26,86,219,1)'
                          fillOpacity={1}
                          strokeOpacity={1}
                          strokeLinecap='round'
                          strokeWidth={0}
                          strokeDasharray={0}
                          className='apexcharts-bar-area'
                          clipPath='url(#gridRectMaskt0rwg4e1)'
                          cy='43.263999999999996'
                          cx='251.80357142857142'
                          j={6}
                        />
                        <g id='SvgjsG2657' className='apexcharts-bar-goals-markers' style={{ pointerEvents: 'none' }}>
                          <g id='SvgjsG2659' className='apexcharts-bar-goals-groups' />
                          <g id='SvgjsG2662' className='apexcharts-bar-goals-groups' />
                          <g id='SvgjsG2665' className='apexcharts-bar-goals-groups' />
                          <g id='SvgjsG2668' className='apexcharts-bar-goals-groups' />
                          <g id='SvgjsG2671' className='apexcharts-bar-goals-groups' />
                          <g id='SvgjsG2674' className='apexcharts-bar-goals-groups' />
                          <g id='SvgjsG2677' className='apexcharts-bar-goals-groups' />
                        </g>
                      </g>
                      <g id='SvgjsG2656' className='apexcharts-datalabels' />
                    </g>
                    <line
                      id='SvgjsLine2700'
                      x1={0}
                      y1={0}
                      x2={239}
                      y2={0}
                      stroke='#b6b6b6'
                      strokeDasharray={0}
                      strokeWidth={1}
                      strokeLinecap='butt'
                      className='apexcharts-ycrosshairs'
                    />
                    <line
                      id='SvgjsLine2701'
                      x1={0}
                      y1={0}
                      x2={239}
                      y2={0}
                      strokeDasharray={0}
                      strokeWidth={0}
                      strokeLinecap='butt'
                      className='apexcharts-ycrosshairs-hidden'
                    />
                    <g id='SvgjsG2702' className='apexcharts-yaxis-annotations' />
                    <g id='SvgjsG2703' className='apexcharts-xaxis-annotations' />
                    <g id='SvgjsG2704' className='apexcharts-point-annotations' />
                  </g>
                  <g id='SvgjsG2688' className='apexcharts-yaxis' transform='translate(-18, 0)' />
                  <g id='SvgjsG2644' className='apexcharts-annotations' />
                </svg>
                <div className='apexcharts-legend' style={{ maxHeight: 70 }} />
                <div className='apexcharts-tooltip apexcharts-theme-light'>
                  <div className='apexcharts-tooltip-title' style={{ fontFamily: 'Inter, sans-serif', fontSize: 14 }} />
                  <div className='apexcharts-tooltip-series-group' style={{ order: 1 }}>
                    <span className='apexcharts-tooltip-marker' style={{ backgroundColor: 'rgb(26, 86, 219)' }} />
                    <div className='apexcharts-tooltip-text' style={{ fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
                      <div className='apexcharts-tooltip-y-group'>
                        <span className='apexcharts-tooltip-text-y-label' />
                      </div>
                      <div className='apexcharts-tooltip-goals-group'>
                        <span className='apexcharts-tooltip-text-goals-label' />
                      </div>
                      <div className='apexcharts-tooltip-z-group'>
                        <span className='apexcharts-tooltip-text-z-label' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light'>
                  <div className='apexcharts-yaxistooltip-text' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard