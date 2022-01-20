import React from 'react';
import { Input } from '../../components/input';

const SnapshotTemplate = () => {
  return (
    <div>
      <Input
        className="duration-field"
        labelText="Duration"
        name="duration"
        type="number"
      />
    </div>
  );
};

export default SnapshotTemplate;
