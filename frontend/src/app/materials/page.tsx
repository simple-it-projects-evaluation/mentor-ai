'use client';

import { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MainLayout from '@/components/layout/MainLayout';
import { materials, Material } from '@/mocks/data';

function getTypeIcon(type: Material['type']) {
  const iconStyle = { fontSize: 28 };
  switch (type) {
    case 'script':
      return <DescriptionOutlinedIcon sx={{ ...iconStyle, color: '#FF6B4A' }} />;
    case 'presentation':
      return <SlideshowOutlinedIcon sx={{ ...iconStyle, color: '#A78BFA' }} />;
    case 'manual':
      return <MenuBookOutlinedIcon sx={{ ...iconStyle, color: '#22C55E' }} />;
    case 'faq':
      return <HelpOutlineIcon sx={{ ...iconStyle, color: '#3B82F6' }} />;
  }
}

function getTypeLabel(type: Material['type']): string {
  switch (type) {
    case 'script':
      return 'Скрипт';
    case 'presentation':
      return 'Презентация';
    case 'manual':
      return 'Мануал';
    case 'faq':
      return 'FAQ';
  }
}

function getTypeColor(type: Material['type']): string {
  switch (type) {
    case 'script':
      return '#FF6B4A';
    case 'presentation':
      return '#A78BFA';
    case 'manual':
      return '#22C55E';
    case 'faq':
      return '#3B82F6';
  }
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function MaterialsPage() {
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);

  const filteredMaterials = materials.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedMaterial(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMaterial(null);
  };

  return (
    <MainLayout title="Материалы" subtitle="Библиотека скриптов, презентаций и обучающих материалов">
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <TextField
          placeholder="Поиск материалов..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'rgba(250, 250, 250, 0.3)', fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{
            background: 'linear-gradient(135deg, #FF6B4A 0%, #FF8A6A 100%)',
            boxShadow: '0 4px 20px rgba(255, 107, 74, 0.3)',
          }}
        >
          Загрузить
        </Button>
      </Box>

      {/* Materials Grid */}
      <Grid container spacing={3}>
        {filteredMaterials.map((material, index) => {
          const typeColor = getTypeColor(material.type);
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={material.id}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: 'fadeInUp 0.4s ease forwards',
                  animationDelay: `${index * 0.05}s`,
                  opacity: 0,
                  '@keyframes fadeInUp': {
                    from: { opacity: 0, transform: 'translateY(15px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                  },
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4)`,
                    '& .actions': {
                      opacity: 1,
                    },
                  },
                }}
              >
                {/* Glow effect */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -30,
                    right: -30,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${typeColor}20 0%, transparent 70%)`,
                    filter: 'blur(15px)',
                  }}
                />
                <CardContent sx={{ p: 3, position: 'relative' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5 }}>
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${typeColor}15`,
                        border: `1px solid ${typeColor}25`,
                      }}
                    >
                      {getTypeIcon(material.type)}
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, material.id)}
                      sx={{
                        width: 32,
                        height: 32,
                        background: 'rgba(255, 255, 255, 0.04)',
                        '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
                      }}
                    >
                      <MoreVertIcon sx={{ fontSize: 18, color: 'rgba(250, 250, 250, 0.5)' }} />
                    </IconButton>
                  </Box>

                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5, lineHeight: 1.3 }}>
                    {material.name}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2.5 }}>
                    <Chip
                      size="small"
                      label={getTypeLabel(material.type)}
                      sx={{
                        background: `${typeColor}20`,
                        color: typeColor,
                        border: `1px solid ${typeColor}30`,
                        fontWeight: 500,
                        fontSize: '0.7rem',
                      }}
                    />
                    <Chip
                      size="small"
                      label={formatSize(material.size)}
                      sx={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: 'rgba(250, 250, 250, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        fontSize: '0.7rem',
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      pt: 2,
                      borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: 'rgba(250, 250, 250, 0.4)' }}>
                      {formatDate(material.uploadedAt)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(250, 250, 250, 0.4)' }}>
                      {material.usageCount} использований
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            background: 'rgba(18, 18, 20, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: 2,
            minWidth: 180,
          },
        }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <VisibilityIcon sx={{ fontSize: 18, color: 'rgba(250, 250, 250, 0.6)' }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ variant: 'body2' }}>Открыть</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <DownloadIcon sx={{ fontSize: 18, color: 'rgba(250, 250, 250, 0.6)' }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ variant: 'body2' }}>Скачать</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <EditIcon sx={{ fontSize: 18, color: 'rgba(250, 250, 250, 0.6)' }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ variant: 'body2' }}>Редактировать</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5, color: '#EF4444' }}>
          <ListItemIcon>
            <DeleteOutlineIcon sx={{ fontSize: 18, color: '#EF4444' }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ variant: 'body2' }}>Удалить</ListItemText>
        </MenuItem>
      </Menu>
    </MainLayout>
  );
}
