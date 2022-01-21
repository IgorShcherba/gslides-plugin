import React, { useEffect, useState } from 'react';
import Server from 'gas-client';
import { Select } from './components/select';
import { FormsTemplate } from './templates/forms';
import SnapshotTemplate from './templates/snapshot';
import { VideoTemplate } from './templates/video';
import { AnimationTemplate } from './templates/animation';
import { Input } from './components/input';

const { serverFunctions } = new Server();

const templateOptions = [
  { title: 'snapshot', value: 'snapshot' },
  { title: 'video', value: 'video' },
  { title: 'forms', value: 'forms' },
  { title: 'animation', value: 'animation' },
];

const renderActiveTemplate = activeTemplate => {
  if (activeTemplate === 'video') {
    return <VideoTemplate />;
  }
  if (activeTemplate === 'forms') {
    return <FormsTemplate />;
  }

  if (activeTemplate === 'snapshot') {
    return <SnapshotTemplate />;
  }
  if (activeTemplate === 'animation') {
    return <AnimationTemplate />;
  }

  return null;
};

const styles = {
  select: {
    width: '100%',
    textTransform: 'capitalize',
    marginBottom: '1rem',
  },
  input: {
    marginBottom: '1rem',
    width: '100%',
  },
};

const App = () => {
  const [slideTitle, setSlideTitle] = useState('');
  const [activeTemplate, setActiveTemplate] = useState(
    templateOptions[0].value
  );

  const getSlideTitle = () => {
    serverFunctions.getActiveSlideTitle().then(resp => {
      setSlideTitle(resp);
    });
  };

  const onTemplateChange = template => {
    setActiveTemplate(template);
  };

  const onChangeSlideTitle = e => {
    setSlideTitle(e.target.value);
  };

  useEffect(() => {
    getSlideTitle();
  }, []);

  return (
    <div className="container">
      <Input
        value={slideTitle}
        onChange={onChangeSlideTitle}
        name="title"
        style={styles.input}
        placeholder="Title"
      />

      <Select
        style={styles.select}
        options={templateOptions}
        value={activeTemplate}
        onChange={onTemplateChange}
      />
      {renderActiveTemplate(activeTemplate)}
    </div>
  );
};

export default App;
