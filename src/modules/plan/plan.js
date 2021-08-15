import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Breadcrumb, Spin, Alert  } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';

const axiosConfig = {
  method: 'get',
  url: 'http://localhost:80/api/plans-features/all',
  headers: { }
};

const constructChoosePlanContent = (plansData) => {
  const {data, loading } = plansData;

  if (data.length > 0 )
  {
    const plans = [];
    const features = [];

    data.forEach(item => {
      item.plan.forEach(plan => {
        if (!plans.some(s => s.planCode === plan.planCode)) {
          plans.push(plan)
        }
      })

      if (!features.some(s => s.featureCode === item.featureCode)) {
        features.push(item);
      }
    });

    const planHeaders = [];
    const planFooters = []
    const featureColumns = [];

    for (let plan of plans) {
      planHeaders.push(
          <th>
              {plan.planName}
            {/* <div>
            </div> */}
          </th>
      )
      planFooters.push(
        <td>
          <div className='plan-table-footer'>
            <input type='radio' id={plan.planCode} name='plan' /><label>{plan.fee} / {plan.feePeriod}</label>
          </div>
        </td>
      )
    }

    for (let feature of features) {
      var isActive = [];
      for (let i = 0; i < planHeaders.length; i++) {
        if (feature.plan[i]) {
          isActive.push(<td><div className='plan-table-is-active-cell' >{feature.plan[i].isActive ? <CheckOutlined/>: <CloseOutlined/> }</div></td>);
        } else {
          isActive.push(<td><div className='plan-table-is-active-cell'><CloseOutlined/></div></td>);
        }
      }

      featureColumns.push(
        <tr>
          <td>
            {feature.featureName}
          </td>
          {isActive}
        </tr>
      )
    }

    return (
      <table className='plan-table'>
        <tr>
        <th></th>
          {planHeaders}
        </tr>
          {featureColumns}
        <tr>
          <td>
          </td>
              {planFooters}
        </tr>
      </table>
    )
  } else if (loading) {
    return (
      <div className='loading'>
        <Spin size='large'>
          <Alert
          message='Fetching data...'
          type='info' />
        </Spin>
      </div>
    )
  } else {
    return (
      <Alert
        message='Network Error'
        description='Please contact support'
        type='error'
        showIcon
      />
    )
  }
}

const Plans = () => {
  const [plansData , setPlansData] = useState({data: [], loading: true, isError: false});

  useEffect(() => {
    axios(axiosConfig)
    .then((res) => {
      const {data, status} = res;
      if (status === 200) {
        setPlansData({ data, loading: false, isError: false })
      }
    }).catch((err) => {
      setPlansData({ data: [], loading: false, isError: true })
    });

  },[setPlansData])

  return (
    <div className='plans-container'>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Plan</Breadcrumb.Item>
      </Breadcrumb>
      <h1>Choose Plan</h1>
      { constructChoosePlanContent(plansData) }
    </div>
  )
};

export default Plans