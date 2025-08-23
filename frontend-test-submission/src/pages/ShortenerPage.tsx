import { useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Snackbar, 
  TextField, 
  Typography,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Alert,
  Chip
} from '@mui/material';
import { 
  Add as AddIcon, 
  Link as LinkIcon, 
  Schedule as ScheduleIcon, 
  Code as CodeIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon
} from '@mui/icons-material';
import { createShortLinks } from '../api';
import { isValidUrl, isValidCode } from '../utils';
import { Log } from '../logger';

type Row = { url: string; minutes: string; code: string; error?: string };
const emptyRow = (): Row => ({ url:'', minutes:'', code:'' });

export default function ShortenerPage() {
  const [rows, setRows] = useState<Row[]>([emptyRow()]);
  const [snack, setSnack] = useState<string>('');
  const [snackType, setSnackType] = useState<'success' | 'error'>('success');
  
  const addRow = () => rows.length < 5 && setRows([...rows, emptyRow()]);
  
  const removeRow = (index: number) => {
    if (rows.length > 1) {
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);
    }
  };

  const submit = async () => {
    try {
      const payload = rows
        .filter(r => r.url.trim() !== '')
        .map(r => {
          if (!isValidUrl(r.url)) throw new Error('Invalid URL format');
          if (r.code && !isValidCode(r.code)) throw new Error('Invalid shortcode');
          const minutes = r.minutes ? parseInt(r.minutes, 10) : 30;
          if (Number.isNaN(minutes) || minutes <= 0) throw new Error('Validity must be a positive integer (minutes)');
          return { longUrl: r.url.trim(), minutes, code: r.code.trim() || undefined };
        });

      const out = await createShortLinks(payload);
      setSnackType('success');
      setSnack(`Successfully created ${out.length} short link(s)!`);
      await Log('frontend','info','middleware','shorten_success');
    } catch (e:any) {
      setSnackType('error');
      setSnack(e.message || 'Something went wrong');
      await Log('frontend','error','middleware', e?.message ?? 'shorten_error');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSnackType('success');
    setSnack('Copied to clipboard!');
  };

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 2,
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Create Short Links
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
        >
          Transform long URLs into short, shareable links with custom codes and expiration times. 
          Create up to 5 links simultaneously for efficient link management.
        </Typography>
      </Box>

      {/* Form Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
          border: '1px solid #e2e8f0',
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <LinkIcon sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
          <Typography variant="h6" fontWeight={600}>
            Link Configuration
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {rows.map((r, i) => (
            <Grid item xs={12} key={i}>
              <Card 
                sx={{ 
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600} color="primary.main">
                      Link #{i + 1}
                    </Typography>
                    {rows.length > 1 && (
                      <Tooltip title="Remove row">
                        <IconButton 
                          onClick={() => removeRow(i)}
                          size="small"
                          color="error"
                          sx={{ 
                            '&:hover': { 
                              background: 'rgba(239, 68, 68, 0.1)' 
                            } 
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField 
                        fullWidth 
                        label="Long URL" 
                        value={r.url}
                        placeholder="https://example.com/very-long-url-path"
                        onChange={(e)=>{
                          const v=e.target.value; 
                          const copy=[...rows]; 
                          copy[i].url=v; 
                          setRows(copy); 
                        }}
                        InputProps={{
                          startAdornment: <LinkIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                        }}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField 
                        fullWidth 
                        label="Validity (minutes)" 
                        value={r.minutes}
                        placeholder="30"
                        onChange={(e)=>{
                          const copy=[...rows]; 
                          copy[i].minutes=e.target.value; 
                          setRows(copy); 
                        }}
                        InputProps={{
                          startAdornment: <ScheduleIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                        }}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField 
                        fullWidth 
                        label="Custom shortcode (optional)" 
                        value={r.code}
                        placeholder="my-link"
                        onChange={(e)=>{
                          const copy=[...rows]; 
                          copy[i].code=e.target.value; 
                          setRows(copy); 
                        }}
                        InputProps={{
                          startAdornment: <CodeIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                        }}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'center' }}>
          <Button 
            variant="outlined" 
            onClick={addRow} 
            disabled={rows.length >= 5}
            startIcon={<AddIcon />}
            sx={{ 
              px: 4, 
              py: 1.5,
              borderWidth: 2,
              '&:disabled': {
                borderColor: 'rgba(0,0,0,0.12)',
                color: 'rgba(0,0,0,0.38)',
              }
            }}
          >
            Add Another Link
          </Button>
          <Button 
            variant="contained" 
            onClick={submit}
            startIcon={<LinkIcon />}
            sx={{ 
              px: 4, 
              py: 1.5,
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)',
              }
            }}
          >
            Create Short Links
          </Button>
        </Box>

        {/* Info Section */}
        <Box sx={{ mt: 4, p: 3, backgroundColor: 'rgba(220, 38, 38, 0.05)', borderRadius: 2, border: '1px solid rgba(220, 38, 38, 0.1)' }}>
          <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600, mb: 1 }}>
            💡 Tips for better results:
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            • Use descriptive custom codes for better memorability • Set appropriate expiration times based on your needs • 
            Ensure URLs include the full protocol (http:// or https://) • Custom codes must be 3-20 characters, alphanumeric with hyphens/underscores
          </Typography>
        </Box>
      </Paper>

      {/* Success Message */}
      <Snackbar 
        open={!!snack} 
        onClose={()=>setSnack('')} 
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={()=>setSnack('')} 
          severity={snackType} 
          sx={{ width: '100%' }}
        >
          {snack}
        </Alert>
      </Snackbar>
    </Box>
  );
}
