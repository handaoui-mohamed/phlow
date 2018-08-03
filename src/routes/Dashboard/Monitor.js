import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip, Button } from 'antd';
import numeral from 'numeral';
import { Pie, WaterWave, Gauge, TagCloud } from 'components/Charts';
import NumberInfo from 'components/NumberInfo';
import CountDown from 'components/CountDown';
import ActiveChart from 'components/ActiveChart';
import Authorized from '../../utils/Authorized';
import styles from './Monitor.less';
import Map from 'components/Map'
import Clock from 'react-digital-clock';

const { Secured } = Authorized;

const targetTime = new Date().getTime() + 3900000;

// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 1000);
});
@Secured(havePermissionAsync)
@connect(({ monitor, loading }) => ({
  monitor,
  loading: loading.models.monitor,
}))
export default class Monitor extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'monitor/fetchTags',
    });
  }

  render() {
    const { monitor, loading } = this.props;
    const { tags } = monitor;

    return (
      <Fragment>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card style={{ marginBottom: 24, position: 'relative', textAlign: 'center' }} bordered={false}>
              <span style={{ fontSize: 25 }}>Current Map : <b>Mina</b></span>
              <Button style={{ position: 'absolute', top: '10px', right: '10px' }}>Change map</Button>
              <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '40px', backgroundColor: '#555' }}> <Clock /> </div>
            </Card>
          </Col>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="" bordered={false}>
              {/* <Row>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="------"
                    suffix=""
                    total={numeral(124543233).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo subTitle="--------" total="92%" />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo subTitle="-------" total={<CountDown target={targetTime} />} />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="------"
                    suffix=""
                    total={numeral(234).format('0,0')}
                  />
                </Col>
              </Row> */}
              <Map />
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card style={{ marginBottom: 24 }} bordered={false}>
              <ActiveChart />
            </Card>
            <Card
              title="Flow speed changes"
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Gauge title='' height={180} percent={82} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="Region-3"
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
            >
              <WaterWave height={161} percent={97} />
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="Region-5"
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
            >
              <WaterWave height={161} percent={93} />
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="Region-1"
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
            >
              <WaterWave height={161} percent={60} />
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="Region-4"
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
            >
              <WaterWave height={161} percent={58} />
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
