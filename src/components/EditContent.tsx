import React, { useState } from 'react'

import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarIcon from '@mui/icons-material/Star'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Autocomplete from '@mui/material/Autocomplete'

import MoodBadIcon from '@mui/icons-material/MoodBad'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

import { LAWS } from '../data/laws'
import { ICode } from '../interface'

export const EditContent = ({
  setCode,
  code,
  review = false,
}: {
  code: ICode,
  setCode: React.Dispatch<React.SetStateAction<ICode>>,
  review?: boolean,
}) => {
  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>, key: keyof ICode) => {
    setCode((c) => ({
      ...c,
      [key]: e.target.value,
    }))
  }

  const [tempNums, setTempNums] = useState<string>('')
  const handleOnChangeChip = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/,$/)) {
      if (!code.nums.includes(tempNums)) {
        setCode((c) => {
          const newNums = [...c.nums]
          newNums.push(tempNums)
          return ({
            ...c,
            nums: newNums,
          })
        })
      }
      setTempNums(() => '')
    } else {
      setTempNums(() => e.target.value)
    }
  }

  const handleOnClickStar = (n: number) => {
    setCode(c => ({
      ...c,
      star: n,
    }))
  }

  const handleOnClickMood = (n: number) => {
    setCode(c => {
      const newFamiliar = [...c.familiar]
      newFamiliar.push(n)
      return ({
        ...c,
        familiar: newFamiliar,
      })
    })
  }

  const handleOnPeep = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(c => {
      const newHasPeeped = [...c.hasPeeped]
      newHasPeeped.push(event.target.checked)
      return ({
        ...c,
        hasPeeped: newHasPeeped,
      })
    })
  }

  const handleOnChangeLaw = (_: any, value: string) => {
    setCode(c => ({
      ...c,
      law: value,
    }))
  }


  return (
    <div className='flex flex-col'>
      <div className='mb-1 flex flex-row justify-between'>
        <TextField sx={{ width: '100%' }} label="標題" size='small' value={code.title}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleOnInput(e, 'title')} required />
        <div className='flex flex-row'>
          {[0, 1, 2, 3, 4].map(n => (
            <IconButton onClick={() => { handleOnClickStar(n + 1) }} size='small' color='warning' key={n}>
              {code.star <= n ? <StarOutlineIcon /> : <StarIcon />}
            </IconButton>
          ))}
        </div>
      </div>

      <div className='my-2 flex-row flex justify-between'>
        <Autocomplete
          disablePortal
          options={LAWS}
          getOptionLabel={(option) => option}
          onChange={handleOnChangeLaw}
          value={code.law}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="法律" size='small' />}
        />

        <div>
          <TextField sx={{ width: '100%', ml: 2 }} label="法條編號" size='small' variant="outlined"
            onChange={handleOnChangeChip} value={tempNums}
            onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              if (e.target.value.trim()) {
                setCode((c) => {
                  const newNums = [...c.nums]
                  newNums.push(e.target.value)
                  return ({
                    ...c,
                    nums: newNums,
                  })
                })
              }
              setTempNums(() => '')
            }}
          />
          <Typography component='p' variant="caption" align='right'>
            輸入 , 來分隔
          </Typography>
        </div>

      </div>

      <div className='mt-2'>
        <Stack direction="row" spacing={1}>
          {code.nums.map((ele: string) => (
            <Chip label={ele} key={ele} onDelete={() => {
              setCode((c) => {
                const newNums = [...c.nums]
                newNums.splice(c.nums.indexOf(ele), 1)
                return ({
                  ...c,
                  nums: newNums,
                })
              })
            }} />
          ))}
        </Stack>
      </div>

      <div className='my-2'>
        <TextField sx={{ width: '100%' }} label="小叮嚀" size='small' variant="outlined" multiline onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleOnInput(e, 'note')} value={code.note} />
      </div>
      <div className='my-2'>
        <TextField sx={{ width: '100%' }} label="連結" size='small' variant="outlined" onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleOnInput(e, 'link')} value={code.link} />
      </div>

      {review
        ? (
          <>
            <Divider />
            <div className='my-2 flex flex-row justify-around'>
              <IconButton onClick={() => { handleOnClickMood(0) }} size='small' color={code.familiar[code.familiar.length - 1] === 0 ? 'error' : 'default'} >
                <MoodBadIcon />
              </IconButton>
              <IconButton onClick={() => { handleOnClickMood(1) }} size='small' color={code.familiar[code.familiar.length - 1] === 1 ? 'success' : 'default'} >
                <SentimentDissatisfiedIcon />
              </IconButton>
              <IconButton onClick={() => { handleOnClickMood(2) }} size='small' color={code.familiar[code.familiar.length - 1] === 2 ? 'primary' : 'default'} >
                <SentimentSatisfiedAltIcon />
              </IconButton>
              <div className='ml-6 flex flex-row justify-center'>
                <FormControlLabel control={<Checkbox onChange={handleOnPeep} checked={code.hasPeeped[code.hasPeeped.length - 1]} />} label="有偷看" />
              </div>
            </div>
          </>
        )
        : null
      }
    </div>
  )
}
