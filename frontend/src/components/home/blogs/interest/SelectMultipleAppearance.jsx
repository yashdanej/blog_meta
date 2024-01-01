import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Box, Chip } from '@mui/joy';
import { useEffect } from 'react';
import { api } from '../../../utils';

const Categories = [
    'Fashion',
    'Beauty',
    'Travel',
    'Lifestyle',
    'Personal',
    'Tech',
    'Health',
    'Fitness',
    'Wellness',
    'SaaS',
    'Business',
    'Education',
    'FoodAndRecipe',
    'LoveAndRelationships',
    'AlternativeTopics',
    'GreenLiving',
    'Music',
    'Automotive',
    'Marketing',
    'InternetServices',
    'Finance',
    'Sports',
    'Entertainment',
    'Productivity',
    'Hobbies',
    'Parenting',
    'Pets',
    'Photography',
    'Agriculture',
    'Art',
    'DIY',
    'Science',
    'Gaming',
    'History',
    'SelfImprovement',
    'NewsAndCurrentAffairs',
  ];
export default function SelectMultipleAppearance({handletags, searchByTags, similarBlogSearch, setSimilarBlogSearch, setSearchByTags}) {
  return (
    <Select
      multiple
      onChange={(event, selectedOptions) => {handletags(event, selectedOptions)}}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', gap: '0.25rem' }}>
          {selected.map((selectedOption) => (
            <Chip variant="soft" color="primary">
              {selectedOption.label}
            </Chip>
          ))}
        </Box>
      )}
      sx={{
        minWidth: '15rem',
      }}
      slotProps={{
        listbox: {
          sx: {
            width: '100%',
          },
        },
      }}
    >
     {Categories.map((category) => (
        <Option key={category} value={category}>
          {category}
        </Option>
      ))}
    </Select>
  );
}