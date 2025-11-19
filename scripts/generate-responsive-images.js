#!/usr/bin/env node

/**
 * Responsive Image Generator
 * 
 * This script generates responsive image variants from source images.
 * Requires: Sharp library (npm install sharp)
 * 
 * Usage: node scripts/generate-responsive-images.js
 */

const fs = require('fs');
const path = require('path');

try {
    const sharp = require('sharp');
    
    const images = [
        {
            source: 'images/logo-color-black-bg1.png',
            variants: [
                { size: { width: 240, height: 180 }, suffix: '-small', quality: 80 },
                { size: { width: 320, height: 240 }, suffix: '-medium', quality: 80 },
                { size: { width: 400, height: 300 }, suffix: '', quality: 80 }
            ]
        },
        {
            source: 'images/coffee-as-you-are.png',
            variants: [
                { size: { width: 180, height: 135 }, suffix: '-small', quality: 80 },
                { size: { width: 237, height: 178 }, suffix: '-medium', quality: 80 },
                { size: { width: 237, height: 178 }, suffix: '', quality: 80 }
            ]
        },
        {
            source: 'images/Menu_Final.png',
            variants: [
                { size: { width: 600, height: 400 }, suffix: '-small', quality: 80 },
                { size: { width: 900, height: 600 }, suffix: '-medium', quality: 80 },
                { size: { width: 1200, height: 800 }, suffix: '', quality: 80 }
            ]
        }
    ];
    
    console.log('🖼️  Generating responsive image variants...\n');
    
    let totalGenerated = 0;
    
    images.forEach(imageGroup => {
        const sourceFile = imageGroup.source;
        
        if (!fs.existsSync(sourceFile)) {
            console.warn(`⚠️  Source file not found: ${sourceFile}`);
            return;
        }
        
        const baseName = path.basename(sourceFile, path.extname(sourceFile));
        const dir = path.dirname(sourceFile);
        
        imageGroup.variants.forEach(variant => {
            const outputName = `${baseName}${variant.suffix}.webp`;
            const outputPath = path.join(dir, outputName);
            
            sharp(sourceFile)
                .resize(variant.size.width, variant.size.height, {
                    fit: 'cover',
                    position: 'center'
                })
                .webp({ quality: variant.quality })
                .toFile(outputPath, (err, info) => {
                    if (err) {
                        console.error(`❌ Error generating ${outputName}:`, err.message);
                    } else {
                        console.log(`✓ ${outputName} (${variant.size.width}x${variant.size.height}, ${Math.round(info.size / 1024)}KB)`);
                        totalGenerated++;
                    }
                });
        });
    });
    
    console.log(`\n✨ Generated ${totalGenerated} image variants!`);
    console.log('📝 Make sure to update HTML files with new responsive picture elements.');
    
} catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
        console.error('❌ Sharp library not found!');
        console.error('\nTo use this script, install Sharp:');
        console.error('  npm install sharp');
        console.error('\nAlternatively, use online tools:');
        console.error('  - Squoosh: https://squoosh.app/');
        console.error('  - CloudConvert: https://cloudconvert.com/');
        process.exit(1);
    } else {
        throw error;
    }
}
