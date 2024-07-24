// src/components/Common/Footer/Footer.js
import React from 'react';
import {Box, Link, Typography} from '@mui/material';
import './Footer.css';

function Footer() {
    return (
        <Box component="footer" className="footer" sx={{py: 3, px: 2, mt: 'auto', backgroundColor: '#f8f9fa'}}>
            <Typography variant="body1" align="center">
                © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary">
                <Link href="https://yourcompany.com" target="_blank" rel="noopener">
                    Visit our website
                </Link>
            </Typography>
        </Box>
    );
}

export default Footer;