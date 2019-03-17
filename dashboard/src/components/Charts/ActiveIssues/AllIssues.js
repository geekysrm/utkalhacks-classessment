// import React from 'react';
// import {
//   Chart,
//   ChartSeries,
//   ChartSeriesItem,
//   ChartCategoryAxis,
//   ChartCategoryAxisItem,
//   ChartValueAxis,
//   ChartValueAxisItem,
//   ChartArea
// } from '@progress/kendo-react-charts';

// const AllIssues = props => {
//   const categoryAxis = {
//     baseUnit: 'months',
//     majorTicks: { visible: false },
//     majorGridLines: { visible: false },
//     labels: { rotation: 'auto', margin: { top: 8 } },
//     line: { visible: false }
//   };

//   const valueAxis = {
//     line: { visible: false },
//     labels: { step: 2, skip: 2, margin: { right: 4 } },
//     majorGridLines: { step: 2, skip: 2, color: '#F0F2F2' }
//   };
//   const data = [
//     {
//       label: 'Positive',
//       value: 7
//     },
//     { label: 'Negative', value: 3 }
//   ];
//   if (this.props && this.props.satisfaction) {
//     return (
//       <div className="col-sm-12">
//         <h5>Effectiveness of Classroom Teaching</h5>
//         {this.props.satisfaction > 0 ? (
//           <div>
//             <p>Positive</p>
//           </div>
//         ) : (
//           <div>
//             <p>Negative</p>
//           </div>
//         )}
//       </div>
//     );
//   } else {
//     return <div>Loading</div>;
//   }
// };

// export default AllIssues;

import React from 'react';
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem
} from '@progress/kendo-react-charts';

const CloseRate = props => {
  const formatp = number => {
    return Intl.NumberFormat(navigator.language, { style: 'percent' }).format(
      number
    );
  };

  const formatd = date => {
    if (!date) {
      return '';
    }
    return new Date(parseInt(date, 10)).toDateString();
  };

  const closeRatePlotBands = [{ from: 0, to: 100, color: '#35C473' }];

  const hidden = { visible: false };
  const temp = [[25, 22]];
  if (props && props.satisfaction)
    return (
      <div className="col-sm-12 mt-3" style={{ border: '1px dotted black' }}>
        <h2 style={{ fontWeight: '600' }} className="d-5">
          Effectiveness of Classroom Teaching:{' '}
        </h2>
        <hr />
        {props.satisfaction > 0 ? (
          <div>
            <p className="lead">
              Your class had{' '}
              <span
                style={{
                  textTransform: 'uppercase',
                  fontSize: '22px',
                  fontWeight: '500',
                  color: 'green'
                }}
              >
                Positive
              </span>{' '}
              response
            </p>
          </div>
        ) : (
          <div>
            <p className="lead">
              Your class had{' '}
              <span
                style={{
                  textTransform: 'uppercase',
                  fontSize: '22px',
                  fontWeight: '500',
                  color: 'red'
                }}
              >
                negative
              </span>{' '}
              response
            </p>
          </div>
        )}
      </div>
    );
  else return <div>Loading...</div>;
};

export default CloseRate;
