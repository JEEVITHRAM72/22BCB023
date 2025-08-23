import { useState } from 'react';
import { 
  allLinks 
} from '../storage';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Divider, 
  Chip, 
  Paper,
  Grid,
  IconButton,
  Tooltip,
  Alert,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse
} from '@mui/material';
import { 
  Link as LinkIcon,
  Analytics as AnalyticsIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  Visibility as VisibilityIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ContentCopy as CopyIcon,
  OpenInNew as OpenInNewIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';

export default function StatsPage() {
  const links = allLinks();
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  
  const toggleExpanded = (code: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(code)) {
      newExpanded.delete(code);
    } else {
      newExpanded.add(code);
    }
    setExpandedCards(newExpanded);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a snackbar here for feedback
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  const getStatusColor = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffHours = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 0) return 'error';
    if (diffHours < 1) return 'warning';
    if (diffHours < 24) return 'info';
    return 'success';
  };

  const getStatusText = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffHours = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 0) return 'Expired';
    if (diffHours < 1) return 'Expires Soon';
    if (diffHours < 24) return 'Expires Today';
    return 'Active';
  };

  const totalClicks = links.reduce((sum, link) => sum + link.clicks.length, 0);
  const activeLinks = links.filter(link => new Date(link.expiresAt) > new Date()).length;

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
          Analytics Dashboard
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
        >
          Monitor your short links performance, track click analytics, and manage link lifecycle
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              color: 'white',
              borderRadius: 3,
            }}
          >
            <LinkIcon sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              {links.length}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Total Links
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              borderRadius: 3,
            }}
          >
            <TrendingUpIcon sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              {totalClicks}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Total Clicks
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #7c2d12 0%, #451a03 100%)',
              color: 'white',
              borderRadius: 3,
            }}
          >
            <VisibilityIcon sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              {activeLinks}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Active Links
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              borderRadius: 3,
            }}
          >
            <AnalyticsIcon sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              {links.length > 0 ? Math.round(totalClicks / links.length) : 0}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Avg. Clicks/Link
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Links List */}
      {links.length === 0 ? (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 6, 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
            border: '1px solid #e2e8f0',
            borderRadius: 3,
          }}
        >
          <AnalyticsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No Analytics Data Available
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto' }}>
            You haven't created any short links yet. Go to the Create Links page to get started and see your analytics here.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {links.map(l => (
            <Grid item xs={12} key={l.code}>
              <Card 
                sx={{ 
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  {/* Header */}
                  <Box sx={{ p: 3, pb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32, 
                              mr: 2,
                              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                            }}
                          >
                            <LinkIcon sx={{ fontSize: 18 }} />
                          </Avatar>
                          <Typography variant="h6" component="code" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                            {window.location.origin}/{l.code}
                          </Typography>
                        </Box>
                        
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ 
                            mb: 2, 
                            wordBreak: 'break-all',
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                            backgroundColor: 'rgba(0,0,0,0.04)',
                            p: 1,
                            borderRadius: 1,
                          }}
                        >
                          {l.longUrl}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                        <Tooltip title="Copy short URL">
                          <IconButton 
                            size="small" 
                            onClick={() => copyToClipboard(`${window.location.origin}/${l.code}`)}
                            sx={{ color: 'primary.main' }}
                          >
                            <CopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Open original URL">
                          <IconButton 
                            size="small" 
                            onClick={() => openLink(l.longUrl)}
                            sx={{ color: 'secondary.main' }}
                          >
                            <OpenInNewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Toggle details">
                          <IconButton 
                            size="small" 
                            onClick={() => toggleExpanded(l.code)}
                          >
                            {expandedCards.has(l.code) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    
                    {/* Status and Metrics */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                      <Chip 
                        label={getStatusText(l.expiresAt)}
                        color={getStatusColor(l.expiresAt) as any}
                        size="small"
                        icon={<ScheduleIcon />}
                      />
                      <Chip 
                        label={`${l.clicks.length} clicks`}
                        color="primary"
                        variant="outlined"
                        size="small"
                        icon={<VisibilityIcon />}
                      />
                      <Chip 
                        label={`Created ${new Date(l.createdAt).toLocaleDateString()}`}
                        variant="outlined"
                        size="small"
                        icon={<CalendarIcon />}
                      />
                      <Chip 
                        label={`Expires ${new Date(l.expiresAt).toLocaleDateString()}`}
                        variant="outlined"
                        size="small"
                        icon={<TimeIcon />}
                      />
                    </Box>
                  </Box>
                  
                  {/* Expandable Details */}
                  <Collapse in={expandedCards.has(l.code)}>
                    <Divider />
                    <Box sx={{ p: 3, pt: 2 }}>
                      {l.clicks.length > 0 ? (
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                            <VisibilityIcon sx={{ mr: 1, fontSize: 20 }} />
                            Click Analytics ({l.clicks.length} clicks)
                          </Typography>
                          <List dense sx={{ backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
                            {l.clicks.map((c, idx) => (
                              <ListItem key={idx} sx={{ py: 1 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                  <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                    {idx + 1}
                                  </Avatar>
                                </ListItemIcon>
                                <ListItemText
                                  primary={
                                    <Typography variant="body2" fontWeight={500}>
                                      {new Date(c.ts).toLocaleString()}
                                    </Typography>
                                  }
                                  secondary={
                                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 0.5 }}>
                                      <Chip 
                                        label={c.referrer || 'Direct'} 
                                        size="small" 
                                        variant="outlined"
                                        sx={{ height: 20, fontSize: '0.75rem' }}
                                      />
                                      <Chip 
                                        label={c.locale || 'Unknown'} 
                                        size="small" 
                                        variant="outlined"
                                        sx={{ height: 20, fontSize: '0.75rem' }}
                                      />
                                      <Chip 
                                        label={c.timezone || 'Unknown'} 
                                        size="small" 
                                        variant="outlined"
                                        sx={{ height: 20, fontSize: '0.75rem' }}
                                      />
                                    </Box>
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      ) : (
                        <Box sx={{ textAlign: 'center', py: 2 }}>
                          <VisibilityIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.3, mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            No clicks yet. Share your link to see analytics here.
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
