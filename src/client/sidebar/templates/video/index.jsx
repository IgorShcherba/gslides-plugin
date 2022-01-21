import React, { useState } from 'react';
import { Input } from '../../components/input';

export const VideoTemplate = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const onChangeVideoUrl = e => {
    setVideoUrl(e.target.value);
  };

  const onChangeStartTime = e => {
    setStartTime(e.target.value);
  };

  const onChangeEndTime = e => {
    setEndTime(e.target.value);
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Input
          labelText="URL: "
          hotizontal
          fullWidth
          name="video-url"
          value={videoUrl}
          onChange={onChangeVideoUrl}
        />
      </div>
      <div className="grid grid-1-2">
        <Input
          value={startTime}
          onChange={onChangeStartTime}
          labelText="Start at:"
          outlined
          style={{ marginRight: '0.5rem' }}
          name="start-tiem"
        />
        <Input
          value={endTime}
          onChange={onChangeEndTime}
          labelText="End at:"
          outlined
          name="end-time"
        />
      </div>
    </div>
  );
};
