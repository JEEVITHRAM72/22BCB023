import { AppBar, Box, Container, Tab, Tabs, Toolbar, Typography, ThemeProvider } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { theme } from './theme';

export default function AppShell() {
  const { pathname } = useLocation();
  const value = pathname.startsWith('/stats') ? 1 : 0;
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <AppBar position="static" elevation={0}>
          <Toolbar sx={{ minHeight: 80 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800,
                    fontSize: '1.25rem',
                  }}
                >
                  🔗
                </Typography>
              </Box>
              <Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'white',
                    mb: 0.5,
                    letterSpacing: '-0.025em'
                  }}
                >
                  URL Shortener
                </Typography>
              </Box>
            </Box>
            
            <Tabs 
              value={value} 
              textColor="inherit" 
              indicatorColor="secondary"
              sx={{
                '& .MuiTab-root': {
                  color: 'rgba(255,255,255,0.8)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  minHeight: 48,
                  px: 3,
                  '&.Mui-selected': {
                    color: 'white',
                  },
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                },
              }}
            >
              <Tab 
                label="Create Links" 
                component={Link} 
                to="/"
                icon={<span style={{ fontSize: '1.2rem' }}>✏️</span>}
                iconPosition="start"
              />
              <Tab 
                label="Analytics" 
                component={Link} 
                to="/stats"
                icon={<span style={{ fontSize: '1.2rem' }}>📊</span>}
                iconPosition="start"
              />
            </Tabs>
          </Toolbar>
        </AppBar>
        
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: 4,
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >
          <Outlet/>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
