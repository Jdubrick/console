import React from 'react';

import {authSvc} from '../module/auth';
import {angulars, register} from './react-wrapper';
import {NavTitle} from './utils';

export const ProfilePage = () => <div className="co-p-profile">
  <NavTitle detail={true} title="Profile" />
  <div className="co-m-pane">
    <div className="co-m-pane__body">
      <div className="co-m-pane__body-section--bordered">
        <dl>
          <dt>Name</dt>
          <dd>{authSvc.name() || '-'}</dd>
          <dt>Email Address</dt>
          <dd>{authSvc.email() || '-'}</dd>
          <dt>kubectl</dt>
          <dd><button className="btn btn-default" type="button" onClick={angulars.modal('kubectl-config')}>Download Configuration</button></dd>
        </dl>
      </div>
    </div>
  </div>
</div>;
register('ProfilePage', ProfilePage);
