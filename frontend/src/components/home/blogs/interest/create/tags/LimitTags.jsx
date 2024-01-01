import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { TextField } from '@mui/material';

export default function LimitTags({setTags}) {
  return (
    <FormControl id="multiple-limit-tags">
      <Autocomplete
        multiple
        placeholder="Tags"
        limitTags={2}
        options={Categories}
        getOptionLabel={(option) => option.title}
        sx={{ width: '500px' }}
        onChange={(event, selectedOptions) => {
        setTags(selectedOptions.map((option) => option.title).join(','));
        }}
        renderInput={(params) => <TextField {...params} label="Tags" />}
      />
    </FormControl>
  );
}

const Categories = [
    { title: 'Fashion' },
    { title: 'Beauty' },
    { title: 'Travel' },
    { title: 'Lifestyle' },
    { title: 'Personal' },
    { title: 'Tech' },
    { title: 'Health' },
    { title: 'Fitness' },
    { title: 'Wellness' },
    { title: 'SaaS' },
    { title: 'Business' },
    { title: 'Education' },
    { title: 'FoodAndRecipe' },
    { title: 'LoveAndRelationships' },
    { title: 'AlternativeTopics' },
    { title: 'GreenLiving' },
    { title: 'Music' },
    { title: 'Automotive' },
    { title: 'Marketing' },
    { title: 'InternetServices' },
    { title: 'Finance' },
    { title: 'Sports' },
    { title: 'Entertainment' },
    { title: 'Productivity' },
    { title: 'Hobbies' },
    { title: 'Parenting' },
    { title: 'Pets' },
    { title: 'Photography' },
    { title: 'Agriculture' },
    { title: 'Art' },
    { title: 'DIY' },
    { title: 'Science' },
    { title: 'Gaming' },
    { title: 'History' },
    { title: 'SelfImprovement' },
    { title: 'NewsAndCurrentAffairs' }
];
  