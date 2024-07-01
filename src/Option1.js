import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Paper, Button, List, ListItemText, ListSubheader, CssBaseline } from '@mui/material';
import Chart from 'chart.js/auto';

const messages = [
    {
        id: 1,
        primary: 'Ashley, who recently graduated with a degree in design, is seeking a loan to launch her freelance graphic design business. She has a strong portfolio and a growing client base but limited credit history due to being new to the workforce. Should she be approved for the loan?',
        secondary: "Yes, Ashley has a strong portfolio and a growing client base, which indicates her potential for success in her freelance graphic design business. Although she has limited credit history, her skills and experience make her a strong candidate for loan approval.",
    },
    {
      id: 2,
      primary: 'Malik, a young father working two jobs to support his family, is seeking a loan to open a small auto repair shop. He has experience as a mechanic and a loyal customer base but limited credit history due to past financial challenges. Should he be approved for the loan?',
      secondary: `Yes, Malik has experience as a mechanic and a loyal customer base, which increases the likelihood of his business being successful. Additionally, his limited credit history can be overcome by providing alternative documentation such as his income and customer testimonials. Supporting small businesses like Malik's can have positive economic and community impact.`,
  },
  {
      id: 3,
      primary: 'Priya, a skilled programmer who just moved to the United States, is seeking a loan to start her own software development company. She has a promising business plan and strong technical skills but limited credit history due to being new to the country. Should she be approved for the loan?',
      secondary: 'No, Since Priya has limited credit history in the United States, lenders may perceive her as a higher risk borrower. This could make it difficult for her to get approved for a loan, especially for starting a new business. Lenders typically prefer borrowers with a strong credit history and established financials to minimize the risk of default. However, there may be other options available to Priya, such as securing the loan with collateral or finding a cosigner with a strong credit history.',
  },
  {
    id: 2,
    primary: 'Ashley, who recently graduated with a degree in design, is seeking a loan to launch her freelance graphic design business. She has a strong portfolio and a growing client base but limited credit history due to being new to the workforce. Should she be approved for the loan?',
    secondary: "Yes, Although Ashley has limited credit history, she has a strong portfolio and a growing client base, indicating her potential for success in her freelance graphic design business. Lenders may consider her skills and potential income as factors for loan approval, despite her limited credit history.",
},
{
  id: 3,
  primary: 'Malik, a young father working two jobs to support his family, is seeking a loan to open a small auto repair shop. He has experience as a mechanic and a loyal customer base but limited credit history due to past financial challenges. Should he be approved for the loan?',
  secondary: `Yes, Despite Malik's limited credit history, he has experience as a mechanic and a loyal customer base, which indicates a potential for success in the auto repair business. Additionally, his commitment to supporting his family by working two jobs demonstrates his dedication and reliability. Therefore, approving him for the loan would provide him with the opportunity to start his own business and improve his financial situation.`,
},
{
  id: 4,
  primary: 'Priya, a skilled programmer who just moved to the United States, is seeking a loan to start her own software development company. She has a promising business plan and strong technical skills but limited credit history due to being new to the country. Should she be approved for the loan?',
  secondary: "No, Due to Priya's limited credit history in the United States, it is unlikely that she will be approved for a loan. Lenders typically consider credit history as an important factor in assessing an applicant's risk and ability to repay the loan. Without a substantial credit history, Priya may not meet the criteria for loan approval, even with a promising business plan and strong technical skills.",
},
];

const StyledFab = styled('div')({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

const ImageGallery = () => {
    const [highlightedWords, setHighlightedWords] = useState([]);
    const [currentColor, setCurrentColor] = useState('yellow'); // Default color
    const [isEraserMode, setIsEraserMode] = useState(false);
    const chartRef = useRef(null);

    const handleHighlight = (event) => {
        if (isEraserMode) return; // Do not highlight if in eraser mode

        // Ensure that the event target is not a button
        if (event.target.tagName === 'BUTTON') return;

        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
        if (selectedText !== '') {
            const range = selection.getRangeAt(0);
            const span = document.createElement('span');
            span.style.backgroundColor = currentColor; // Use current color
            span.appendChild(range.extractContents());
            range.insertNode(span);
            span.onclick = () => {
                if (isEraserMode) {
                    handleRemoveHighlight(span);
                }
            };
            setHighlightedWords([...highlightedWords, { text: selectedText, color: currentColor, element: span }]);
        }
    };

    const changeColor = (color) => {
        setCurrentColor(color);
        setIsEraserMode(false); // Disable eraser mode when changing color
    };

    const enableEraserMode = () => {
        setIsEraserMode(true);
    };

    const handleRemoveHighlight = (element) => {
        const parent = element.parentNode;
        while (element.firstChild) {
            parent.insertBefore(element.firstChild, element);
        }
        parent.removeChild(element);
        setHighlightedWords(highlightedWords.filter(word => word.element !== element));
    };

    const handleClick = (e) => {
        if (isEraserMode && e.target.tagName === 'SPAN') {
            handleRemoveHighlight(e.target);
        }
    };

    // Count highlighted words for each color
    const yellowCount = highlightedWords.filter((word) => word.color === 'yellow').length;
    const pinkCount = highlightedWords.filter((word) => word.color === 'pink').length;
    const cyanCount = highlightedWords.filter((word) => word.color === 'cyan').length;
    const greenCount = highlightedWords.filter((word) => word.color === 'green').length;

    useEffect(() => {
        if (chartRef.current !== null) {
            chartRef.current.destroy(); // Destroy the existing chart if it exists
        }

        // Draw stacked bar chart
        const ctx = document.getElementById('highlightChart');
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Women', 'Men'],
                datasets: [
                    {
                        label: 'Women being approved',
                        data: [yellowCount, 0],
                        backgroundColor: '#FFD700',
                        stack: 'Women'
                    },
                    {
                        label: 'Women not being approved',
                        data: [pinkCount, 0],
                        backgroundColor: '#FFC0CB',
                        stack: 'Women'
                    },
                    {
                        label: 'Men being approved',
                        data: [0, cyanCount],
                        backgroundColor: '#00FFFF',
                        stack: 'Men'
                    },
                    {
                        label: 'Men not being approved',
                        data: [0, greenCount],
                        backgroundColor: '#00FF00',
                        stack: 'Men'
                    }
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1
                        }
                        

                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }, [yellowCount, cyanCount, pinkCount, greenCount]);

    const containerStyle = {
        width: '90%', // Adjust as needed
        height: '490px', // Adjust as needed
        overflowY: 'auto', // Enable vertical scrollbar
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '20px', // Add some space between containers
        marginLeft: '40px',
    };
    const containerStyle1 = {
        width: '90%', // Adjust as needed
        height: '235px', // Adjust as needed
        overflowY: 'auto', // Enable vertical scrollbar
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '20px', // Add some space between containers
        marginLeft: '20px',
    };
    const containerStyle2 = {
        width: '90%', // Adjust as needed
        height: '235px', // Adjust as needed
        overflowY: 'auto', // Enable vertical scrollbar
        border: '1px solid #ccc',
        padding: '10px',
        paddingTop: '0px',
        marginBottom: '20px', // Add some space between containers
        marginLeft: '20px',
    };
    return (
        <div onMouseUp={handleHighlight} onClick={handleClick}>
            <div style={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ color: '#333', fontWeight: 'bold', paddingTop: '30px' }}>Highlight names of women and men being approved and not being approved for the loan with related highlighters.</Typography>
                <Paper elevation={2} style={{ backgroundColor: '#51CCBE', textAlign: 'center', margin: '20px auto', padding: '20px', maxWidth: '1300px' }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF', fontSize: '17px', fontWeight: 'bold' }}>
                        Prompt: An applicant with experience in a skilled trade is seeking a loan to start their own business. They have a strong
                        work ethic and a growing client base but limited credit history due to past financial challenges or being new to
                        the country/workforce. Should they be approved for the loan?
                    </Typography>
                </Paper>
                <Button variant="outlined" sx={{ bgcolor: 'FFFFFF', color: '#51CCBE', borderColor: '#51CCBE' }} onClick={() => changeColor('yellow')}>Women being approved</Button>
                <Button variant="outlined" sx={{ bgcolor: 'FFFFFF', color: '#51CCBE', borderColor: '#51CCBE' }} onClick={() => changeColor('pink')}>Women not being approved</Button>
                <Button variant="outlined" sx={{ bgcolor: 'FFFFFF', color: '#51CCBE', borderColor: '#51CCBE' }} onClick={() => changeColor('cyan')}>Men being approved</Button>
                <Button variant="outlined" sx={{ bgcolor: 'FFFFFF', color: '#51CCBE', borderColor: '#51CCBE' }} onClick={() => changeColor('green')}>Men not being approved</Button>
                <Button variant="outlined" sx={{ bgcolor: 'FFFFFF', color: '#51CCBE', borderColor: '#51CCBE' }} onClick={enableEraserMode}>Eraser</Button>
            </div>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                    <h2 style={{ textAlign: 'center' }}>Prompts and Results</h2>
                    <React.Fragment>
                        <CssBaseline />
                        <Paper square sx={{ pb: '50px' }} style={containerStyle}>
                            <List onMouseUp={handleHighlight} sx={{ mb: 2 }}>
                                {messages.map(({ id, primary, secondary, person }) => (
                                    <React.Fragment key={id}>

                                        {id === 3 && (
                                            <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                                            </ListSubheader>
                                        )}
                                        <ListItemText primary={primary} secondary={secondary} />
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>
                    </React.Fragment>
                </div>
                <div style={{ flex: 1 }}>
                    <h2 style={{ textAlign: 'center' }}>Table and Barchart</h2>
                    <div>
                        <Paper square sx={{ pb: '50px' }} style={containerStyle1}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Women being approved</th>
                                        <th>Women not being approved</th>
                                        <th>Men being approved</th>
                                        <th>Men not being approved</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {highlightedWords.map((word, index) => (
                                        <tr key={index}>
                                            <td style={{ backgroundColor: word.color === 'yellow' ? word.color : 'transparent' }}>{word.color === 'yellow' && word.text}</td>
                                            <td style={{ backgroundColor: word.color === 'pink' ? word.color : 'transparent' }}>{word.color === 'pink' && word.text}</td>
                                            <td style={{ backgroundColor: word.color === 'cyan' ? word.color : 'transparent' }}>{word.color === 'cyan' && word.text}</td>
                                            <td style={{ backgroundColor: word.color === 'green' ? word.color : 'transparent' }}>{word.color === 'green' && word.text}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Paper>
                        <Paper square sx={{ pb: '50px' }} style={containerStyle2}>
                            <canvas id="highlightChart" width="400" height="200"></canvas>
                        </Paper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
