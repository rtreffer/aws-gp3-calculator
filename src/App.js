import React from 'react';
import { connect, dispatch } from 'react-redux';
import { Container, Row, Jumbotron, Form, Table } from 'react-bootstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import "bootstrap-slider/dist/css/bootstrap-slider.css";
import {
  setDiskSize,
  setDiskCount,
  setIOPS,
  setMIBPS
} from './app/gp3Slice';

function money(x) {
  return Math.ceil(x * 100) / 100
}

function round100(x) {
  return Math.round(x * 100) / 100
}

function App(props) {
  return (
    <Container>
      <Row className="justify-content-md-center" xs={12} md={8}>
        <Jumbotron style={{width: "100%"}}>
          <Container>
            <h1>AWS/GP3 calculator</h1>
            <Form>
              <Form.Group controlId="formDiskSize">
                <Form.Label>Storage capacity in GB</Form.Label>
                <Form.Control size="lg" type="number" placeholder="100"
                  onChange={ e => props.dispatch(setDiskSize(parseInt(e.target.value))) }
                />
                <Form.Text className="text-muted">
                  { round100(props.size / 1000) } TB or { props.size } GB, { props.size * 0.08 }$ / month
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formDiskNum">
                <Form.Label>Number of disks</Form.Label>
                <Form.Control size="lg" type="number" placeholder="1"
                  onChange={e => props.dispatch(setDiskCount(parseInt(e.target.value))) }
                />
                <Form.Text className="text-muted">
                { round100(props.size / 1000 / props.disks) } TB or { round100(props.size / props.disks) } GB per disk, { money(props.size / props.disks * 0.08) }$ / disk / month
                </Form.Text>
              </Form.Group>
              <strong>Baseline: {props.iopsMin} IOPs, {props.mibpsMin} MiB/s</strong>
              <Form.Group>
                <Form.Label>IOPs ({props.iopsMin}-{props.iopsMax}, {4000*props.disks} for max throughput)</Form.Label><br/>
                <ReactBootstrapSlider 
                  value={props.iops}
                  step={100}
                  change={ e => props.dispatch(setIOPS(e.target.value)) }
                  slideStop={ () => {} }
                  max={props.iopsMax}
                  min={props.iopsMin}
                />
                <Form.Text className="text-muted">
                {props.iops} IOPs, {round100(props.iops / props.disks)} per disk, {money((props.iops - props.iopsMin)*0.005)}$ / month
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>MiB/s ({props.mibpsMin}-{props.mibpsMax})</Form.Label><br/>
                <ReactBootstrapSlider 
                  value={props.mibps}
                  step={1}
                  change={ e => props.dispatch(setMIBPS(e.target.value)) }
                  slideStop={ () => {} }
                  max={props.mibpsMax}
                  min={props.mibpsMin}
                />
                <Form.Text className="text-muted">
                  {props.mibps} MiB/s, {round100(props.mibps / props.disks)} per disk, {money((props.mibps - props.mibpsMin)*0.04)}$ / month
                </Form.Text>
              </Form.Group>
            </Form>
            {!!props.size && !!props.disks &&
            <>
            <h1>Total cost:  { money(props.size * 0.08 + (props.iops - props.iopsMin)*0.005 + (props.mibps - props.mibpsMin)*0.04) }$/month</h1>
            <Table striped hover>
              <tbody>
                <tr><td>Disks</td><td>{ props.disks} @ { round100(props.size / props.disks / 1000) } TB or { round100(props.size / props.disks) } GB</td></tr>
                <tr><td>Size</td><td>{ round100(props.size / 1000) } TB or { props.size } GB</td></tr>
                <tr><td>IOPS</td><td>{ props.iops }</td></tr>
                <tr><td>MB/s</td><td>{ props.mibps }</td></tr>
             </tbody>
            </Table>
            </>
            }
            {!!props.gp2 && !!props.gp2.min &&
            <>
            <hr/>
            <h1>GP2: {money(props.gp2.min.size * 0.1)}$/month - {money(props.gp2.max.size * 0.1)}$/month</h1>
            <Table striped hover>
              <tbody>
                <tr><td>Disks</td>
                    <td>{ props.gp2.min.disks} @ { round100(props.gp2.min.size / props.gp2.min.disks / 1000) } TB or { round100(props.gp2.min.size / props.gp2.min.disks) } GB</td>
                    <td>{ props.gp2.max.disks} @ { round100(props.gp2.max.size / props.gp2.max.disks / 1000) } TB or { round100(props.gp2.max.size / props.gp2.max.disks) } GB</td>
                </tr>
                <tr>
                    <td>Size</td>
                    <td>{ round100(props.gp2.min.size / 1000) } TB or { props.gp2.min.size } GB</td>
                    <td>{ round100(props.gp2.max.size / 1000) } TB or { props.gp2.max.size } GB</td>
                </tr>
                <tr>
                    <td>IOPS</td>
                    <td>{ props.gp2.min.iops } (burst: { props.gp2.min.iopsMax })</td>
                    <td>{ props.gp2.max.iops }</td>
                </tr>
                <tr>
                  <td>MB/s</td>
                  <td>{ props.gp2.min.mibps }</td>
                  <td>{ props.gp2.max.mibps }</td>
                </tr>
                <tr>
                  <td>Cost</td>
                  <td><strong>{money(props.gp2.min.size * 0.1)}$/month</strong></td>
                  <td><strong>{money(props.gp2.max.size * 0.1)}$/month</strong></td>
                </tr>
             </tbody>
            </Table>
            </>
            }
         </Container>
        </Jumbotron>
      </Row>
    </Container>
  );
}

export default connect(state => {
  return state.gp3;
})(App);
